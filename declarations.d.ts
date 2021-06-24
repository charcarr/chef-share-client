declare module "*.module.css" {
  const styles: { [key: string]: string; };
  export = styles;
}

declare module "*.png"

declare module 'redux-persist/lib/storage';
declare module 'redux-persist/integration/react';