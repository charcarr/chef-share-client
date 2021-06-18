declare module "*.css" {
  const styles: { [className: string]: string };
  export default styles;
}

declare module "*.png"

declare module 'redux-persist/lib/storage';
declare module 'redux-persist/integration/react';