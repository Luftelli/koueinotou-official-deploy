exports.createPages = ({ actions }) => {
    const { createRedirect } = actions;
    createRedirect({
        fromPath: "https://koueinotou.netlify.app/*",
        toPath: "https://koueinotou.luftelli.com/:splat",
        isPermanent: true,
        force: true
    });
}