Legacy Project Summary of Changes - Chef Share Client

- Refactored to typescript
- Set up Jest to work with Gatsby (major configuration effort), added the following:
  - loadershim.js
  - jest-preprocess.js
  - jest.config.js
  - added paths property to tsconfig.json
  - added mocks folder and contents per instructions from Gatsby's site to set up testing (https://www.gatsbyjs.com/docs/how-to/testing/unit-testing/#setting-up-your-environment)
- Removed comments from tsconfig.json to address unexpected token issue with Jest setup, preserved original tsconfig contents in tsconfig.example.json
- Added declaration in declarations.d.ts to address css import issues
- Implemented test on index page (pages/tests) to test for switching between login and register pages
- Added tests to Login and Signup components to test form submission
  - Used enzyme for additional test functionality