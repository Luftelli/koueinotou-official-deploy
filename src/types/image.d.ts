type ImportedImage = {};
const importedImage: ImportedImage;

declare module '*.png' {
    export default importedImage;
}
declare module '*.jpg' {
    export default importedImage;
}
declare module '*.gif' {
    export default importedImage;
}
