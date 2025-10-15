import React, { useCallback, useEffect, useRef } from 'react';

type Particle = {
  x: number;
  y: number;
  baseX: number; // スクロール計算用の基準X座標
  baseY: number; // スクロール計算用の基準Y座標
  vx: number;
  vy: number;
  size: number;
  brightness: number;
  alpha: number; // フェード用の透明度
  hue: number; // 現在の色相
  hueSpeed: number; // 色相の変化速度
  hueRange: number; // 色相の変化範囲
  baseHue: number; // 基準となる色相
};

// アニメーション定数
const PARTICLE_DENSITY = 15000; // パーティクル密度（数値が大きいほど疎）
const MIN_SCREEN_HEIGHT_MULTIPLIER = 3; // 最小スクロール範囲（画面の何倍分）
const PARTICLE_VELOCITY_RANGE = 0.5; // パーティクルの速度範囲
const PARTICLE_SIZE_MIN = 1.5; // パーティクルの最小サイズ（少し大きく）
const PARTICLE_SIZE_RANGE = 2.5; // パーティクルのサイズ範囲（少し大きく）
const PARTICLE_BRIGHTNESS_MIN = 0.5; // 最小輝度
const PARTICLE_BRIGHTNESS_RANGE = 0.5; // 輝度の範囲

// 色相設定
const NEON_HUE_OPTIONS = [180, 270, 300, 150, 30, 200]; // シアン、紫、ピンク、緑、オレンジ、青
const HUE_SPEED_MIN = 0.2; // 色相変化速度の最小値
const HUE_SPEED_RANGE = 0.5; // 色相変化速度の範囲
const HUE_CHANGE_RANGE_MIN = 20; // 色相変化幅の最小値
const HUE_CHANGE_RANGE_MAX = 30; // 色相変化幅の追加範囲

// 背景色設定
const BG_HUE_START = 220; // 背景色の開始色相（青）
const BG_HUE_RANGE = 40; // 背景色の変化範囲（紫へ）
const BG_LIGHTNESS = 3; // 背景の明度
const SCROLL_FOR_FULL_BG_TRANSITION = 2000; // 背景色が完全に変化するスクロール量

// パララックス設定
const PARALLAX_SCROLL_FACTOR = 0.1; // スクロール追従率（10%）

// フェード設定
const FADE_MARGIN = 100; // 画面端からのフェード開始距離

// パーティクル描画設定
const PARTICLE_BRIGHTNESS_BASE = 60; // パーティクル明度のベース値
const PARTICLE_BRIGHTNESS_MULTIPLIER = 40; // 輝度による明度の変化量
const PARTICLE_ALPHA_MULTIPLIER = 0.9; // 透明度の乗数

// フレーム制御
const TARGET_FPS = 60;
const FRAME_INTERVAL = 1000 / TARGET_FPS;

// 接続線設定
const CONNECTION_MAX_DISTANCE = 200; // 接続線を描画する最大距離（短縮）
const CONNECTION_MAX_DISTANCE_SQUARED = CONNECTION_MAX_DISTANCE * CONNECTION_MAX_DISTANCE; // 距離の2乗（最適化用）
const CONNECTION_FADE_START_DISTANCE = 150; // 接続線のフェード開始距離（短縮）
const CONNECTION_FADE_START_DISTANCE_SQUARED =
  CONNECTION_FADE_START_DISTANCE * CONNECTION_FADE_START_DISTANCE; // フェード開始距離の2乗
const CONNECTION_OPACITY_MULTIPLIER = 0.6; // 接続線の基本透明度
const CONNECTION_BRIGHTNESS = 70; // 接続線の明度
const CONNECTION_LINE_WIDTH = 1.2; // 接続線の太さ
const CONNECTION_FADE_RANGE = CONNECTION_MAX_DISTANCE - CONNECTION_FADE_START_DISTANCE;

// 視界カリング設定
const VIEWPORT_MARGIN = 150; // 視界外判定のマージン（接続線の描画範囲を考慮）

// 空間分割設定（グリッドベースの近傍探索）
const GRID_CELL_SIZE = CONNECTION_MAX_DISTANCE; // グリッドセルのサイズ

/**
 * パーティクルが視界内にあるか判定（マージン付き）
 */
const isParticleVisible = (particle: Particle, canvasHeight: number, scrollY: number): boolean => {
  const scrollOffsetY = scrollY * PARALLAX_SCROLL_FACTOR;
  const screenY = particle.baseY - scrollOffsetY;

  // 視界外判定（接続線の描画範囲を考慮したマージン）
  return screenY > -VIEWPORT_MARGIN && screenY < canvasHeight + VIEWPORT_MARGIN;
};

/**
 * 空間グリッドを構築（近傍探索の高速化）
 */
type SpatialGrid = Map<string, Particle[]>;

const buildSpatialGrid = (particles: Particle[]): SpatialGrid => {
  const grid: SpatialGrid = new Map();

  particles.forEach((particle) => {
    const cellX = Math.floor(particle.x / GRID_CELL_SIZE);
    const cellY = Math.floor(particle.y / GRID_CELL_SIZE);
    const key = `${cellX},${cellY}`;

    if (!grid.has(key)) {
      grid.set(key, []);
    }
    const cell = grid.get(key);
    if (cell) {
      cell.push(particle);
    }
  });

  return grid;
};

/**
 * 近傍セルのパーティクルを取得
 */
const getNeighborParticles = (particle: Particle, grid: SpatialGrid): Particle[] => {
  const neighbors: Particle[] = [];
  const cellX = Math.floor(particle.x / GRID_CELL_SIZE);
  const cellY = Math.floor(particle.y / GRID_CELL_SIZE);

  // 自分のセルと隣接8セルを探索
  for (let dx = -1; dx <= 1; dx += 1) {
    for (let dy = -1; dy <= 1; dy += 1) {
      const key = `${cellX + dx},${cellY + dy}`;
      const cellParticles = grid.get(key);
      if (cellParticles) {
        neighbors.push(...cellParticles);
      }
    }
  }

  return neighbors;
};

/**
 * ドキュメント全体の高さを計算（最小値を保証）
 */
const calculateDocumentHeight = (): number =>
  Math.max(
    document.documentElement.scrollHeight,
    window.innerHeight * MIN_SCREEN_HEIGHT_MULTIPLIER,
  );

/**
 * パーティクルを初期化
 */
const createParticles = (canvasWidth: number, documentHeight: number): Particle[] => {
  const particles: Particle[] = [];
  const particleCount = Math.floor((canvasWidth * documentHeight) / PARTICLE_DENSITY);

  for (let i = 0; i < particleCount; i += 1) {
    const x = Math.random() * canvasWidth;
    const y = Math.random() * documentHeight;
    const baseHue = NEON_HUE_OPTIONS[Math.floor(Math.random() * NEON_HUE_OPTIONS.length)];

    particles.push({
      x,
      y,
      baseX: x,
      baseY: y,
      vx: (Math.random() - 0.5) * PARTICLE_VELOCITY_RANGE,
      vy: (Math.random() - 0.5) * PARTICLE_VELOCITY_RANGE,
      size: Math.random() * PARTICLE_SIZE_RANGE + PARTICLE_SIZE_MIN,
      brightness: Math.random() * PARTICLE_BRIGHTNESS_RANGE + PARTICLE_BRIGHTNESS_MIN,
      alpha: 1.0,
      hue: baseHue,
      baseHue,
      hueSpeed: Math.random() * HUE_SPEED_RANGE + HUE_SPEED_MIN,
      hueRange: Math.random() * HUE_CHANGE_RANGE_MAX + HUE_CHANGE_RANGE_MIN,
    });
  }

  return particles;
};

const clamp = (value: number, min: number, max: number): number =>
  Math.max(min, Math.min(max, value));

const calculateAxisFade = (position: number, limit: number): number => {
  if (position < FADE_MARGIN) {
    return clamp(position / FADE_MARGIN, 0, 1);
  }
  if (position > limit - FADE_MARGIN) {
    return clamp((limit - position) / FADE_MARGIN, 0, 1);
  }
  return 1;
};

const wrapPosition = (value: number, limit: number): number => {
  if (value < -FADE_MARGIN) {
    return limit + FADE_MARGIN;
  }
  if (value > limit + FADE_MARGIN) {
    return -FADE_MARGIN;
  }
  return value;
};

/**
 * パーティクルの位置とフェード効果を更新
 */
const updateParticle = (
  particle: Particle,
  canvasWidth: number,
  documentHeight: number,
  scrollY: number,
  animationTime: number,
): void => {
  const nextBaseX = particle.baseX + particle.vx;
  const nextBaseY = particle.baseY + particle.vy;

  const fadeX = calculateAxisFade(nextBaseX, canvasWidth);
  const fadeY = calculateAxisFade(nextBaseY, documentHeight);
  const nextAlpha = clamp(fadeX * fadeY, 0, 1);

  const wrappedBaseX = wrapPosition(nextBaseX, canvasWidth);
  const wrappedBaseY = wrapPosition(nextBaseY, documentHeight);

  const scrollOffsetY = scrollY * PARALLAX_SCROLL_FACTOR;
  const hueOffset = Math.sin(animationTime * particle.hueSpeed * 0.01) * particle.hueRange;
  const nextHue = particle.baseHue + hueOffset;

  Object.assign(particle, {
    baseX: wrappedBaseX,
    baseY: wrappedBaseY,
    alpha: nextAlpha,
    x: wrappedBaseX,
    y: wrappedBaseY - scrollOffsetY,
    hue: nextHue,
  });
};

/**
 * パーティクルを描画（超軽量版：最小限の描画で発光効果）
 */
const drawParticle = (ctx: CanvasRenderingContext2D, particle: Particle): void => {
  const brightness =
    PARTICLE_BRIGHTNESS_BASE + particle.brightness * PARTICLE_BRIGHTNESS_MULTIPLIER;
  const alpha = particle.brightness * PARTICLE_ALPHA_MULTIPLIER * particle.alpha;
  const outerGlowAlpha = alpha * 0.25;
  const glowRadius = particle.size * 2;
  const coreRadius = particle.size;
  const coreBrightness = Math.min(100, brightness + 10);

  // 外側のソフトグロー（1層のみ）
  ctx.fillStyle = `hsla(${particle.hue}, 100%, ${brightness}%, ${outerGlowAlpha})`;
  ctx.beginPath();
  ctx.arc(particle.x, particle.y, glowRadius, 0, Math.PI * 2);
  ctx.fill();

  // コア部分（明るい中心）
  ctx.fillStyle = `hsla(${particle.hue}, 100%, ${coreBrightness}%, ${alpha})`;
  ctx.beginPath();
  ctx.arc(particle.x, particle.y, coreRadius, 0, Math.PI * 2);
  ctx.fill();
};

/**
 * パーティクル間の接続線を描画（最適化版）
 */
const drawConnections = (ctx: CanvasRenderingContext2D, visibleParticles: Particle[]): void => {
  // 視界内のパーティクルでグリッドを構築
  const grid = buildSpatialGrid(visibleParticles);
  const visibleIndexMap = new Map<Particle, number>();
  visibleParticles.forEach((particle, index) => {
    visibleIndexMap.set(particle, index);
  });

  // 視界内のパーティクルのみ処理
  for (let i = 0; i < visibleParticles.length; i += 1) {
    const p1 = visibleParticles[i];

    // 近傍のパーティクルのみ取得
    const neighbors = getNeighborParticles(p1, grid);

    neighbors.forEach((p2) => {
      // 自分自身との接続はスキップ
      if (p1 === p2) return;

      // 重複を避けるため、p1のインデックスがp2より小さい場合のみ描画
      const p2Index = visibleIndexMap.get(p2);
      if (p2Index === undefined || i >= p2Index) return;

      const dx = p1.x - p2.x;
      const dy = p1.y - p2.y;
      const distanceSquared = dx * dx + dy * dy;

      // 距離の2乗で判定（平方根計算を省略）
      if (distanceSquared < CONNECTION_MAX_DISTANCE_SQUARED) {
        const distance = Math.sqrt(distanceSquared);

        // 距離に応じた基本的な透明度
        let distanceOpacity = 1 - distance / CONNECTION_MAX_DISTANCE;

        // フェード開始距離以降でなめらかにフェードアウト
        if (distanceSquared > CONNECTION_FADE_START_DISTANCE_SQUARED) {
          const fadeProgress =
            CONNECTION_FADE_RANGE === 0
              ? 1
              : (distance - CONNECTION_FADE_START_DISTANCE) / CONNECTION_FADE_RANGE;
          distanceOpacity *= 1 - fadeProgress;
        }

        // パーティクルのalpha値も考慮
        const combinedAlpha = Math.min(p1.alpha, p2.alpha);
        const finalOpacity = distanceOpacity * CONNECTION_OPACITY_MULTIPLIER * combinedAlpha;

        if (finalOpacity <= 0) {
          return;
        }

        // 2つのパーティクルの色相を平均
        const averageHue = (p1.hue + p2.hue) / 2;
        const lineColor = `hsla(${averageHue}, 100%, ${CONNECTION_BRIGHTNESS}%, ${finalOpacity})`;

        // 接続線を描画（shadowBlur不使用で高速化）
        ctx.strokeStyle = lineColor;
        ctx.lineWidth = CONNECTION_LINE_WIDTH;
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
      }
    });
  }
};

/**
 * 背景色を計算（スクロール量に応じて変化）
 */
const getBackgroundColor = (scrollY: number): string => {
  const scrollRate = Math.min(scrollY / SCROLL_FOR_FULL_BG_TRANSITION, 1);
  const bgHue = BG_HUE_START + scrollRate * BG_HUE_RANGE;
  return `hsl(${bgHue}, 100%, ${BG_LIGHTNESS}%)`;
};

/**
 * ネオン調の幾何学模様が動く背景
 * パーティクルと接続ラインを組み合わせた未来的なビジュアル
 */
const ParallaxBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationFrameRef = useRef<number>();
  const scrollYRef = useRef(0);
  const animationTimeRef = useRef(0);
  const documentHeightRef = useRef(0); // ドキュメント高さをキャッシュ

  // ドキュメント高さを更新（強制リフロー発生の可能性があるため、頻繁に呼ばない）
  const updateDocumentHeight = useCallback((): void => {
    documentHeightRef.current = calculateDocumentHeight();
  }, []);

  // ResizeObserverでドキュメント高さの変化を監視
  useEffect(() => {
    // 初期高さを設定
    updateDocumentHeight();

    let resizeObserverTimeout: ReturnType<typeof setTimeout> | null = null;

    const scheduleDocumentHeightUpdate = (): void => {
      if (resizeObserverTimeout) {
        clearTimeout(resizeObserverTimeout);
      }
      resizeObserverTimeout = setTimeout(() => {
        requestAnimationFrame(() => {
          updateDocumentHeight();
        });
      }, 500);
    };

    // ResizeObserverでbody要素の変化を監視
    const resizeObserver = new ResizeObserver(() => {
      // デバウンス処理（頻繁な更新を防ぐ：500ms間隔）
      scheduleDocumentHeightUpdate();
    });

    // body要素とdocumentElement両方を監視
    resizeObserver.observe(document.body);
    resizeObserver.observe(document.documentElement);

    return () => {
      if (resizeObserverTimeout) {
        clearTimeout(resizeObserverTimeout);
      }
      resizeObserver.disconnect();
    };
  }, [updateDocumentHeight]);

  // スクロール位置の追跡
  useEffect(() => {
    const handleScroll = (): void => {
      scrollYRef.current = window.scrollY;
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // キャンバスのリサイズ処理
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const resizeCanvas = (): void => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      // ResizeObserverが自動的にドキュメント高さを更新するため、ここでは呼ばない
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  // パーティクル初期化とアニメーション
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const ctx = canvas.getContext('2d');
    if (!ctx) return undefined;

    // 初期ドキュメント高さを設定
    updateDocumentHeight();

    // パーティクルを初期化
    particlesRef.current = createParticles(canvas.width, documentHeightRef.current);

    // フレームレート制御（60fps目標）
    let lastFrameTime = performance.now();

    // アニメーションループ
    const animate = (currentTime: number): void => {
      if (!ctx || !canvas) return;

      // フレームレート制御
      const elapsed = currentTime - lastFrameTime;
      if (elapsed < FRAME_INTERVAL) {
        animationFrameRef.current = requestAnimationFrame(animate);
        return;
      }
      lastFrameTime = currentTime - (elapsed % FRAME_INTERVAL);

      animationTimeRef.current += 1;
      const currentScrollY = scrollYRef.current;
      const canvasHeight = canvas.height;
      const particles = particlesRef.current;

      // 背景色を描画
      ctx.fillStyle = getBackgroundColor(currentScrollY);
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // 視界内のパーティクルをフィルタリング
      const visibleParticles: Particle[] = [];

      // パーティクルを更新・描画（キャッシュされたドキュメント高さを使用）
      particles.forEach((particle) => {
        updateParticle(
          particle,
          canvas.width,
          documentHeightRef.current,
          currentScrollY,
          animationTimeRef.current,
        );

        // 視界内判定
        if (isParticleVisible(particle, canvasHeight, currentScrollY)) {
          visibleParticles.push(particle);
          drawParticle(ctx, particle);
        }
      });

      // 接続線を描画（視界内のパーティクルのみ）
      if (visibleParticles.length > 1) {
        drawConnections(ctx, visibleParticles);
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    // アニメーションを開始（初回フレーム時刻を渡す）
    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [updateDocumentHeight]);

  return (
    <canvas
      ref={canvasRef}
      className='fixed top-0 left-0 -z-50 w-screen h-screen'
      style={{ background: '#000510' }}
    />
  );
};

export default ParallaxBackground;
