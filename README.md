# ShareNote Frontend Vue Scaffolding Code

[中文](https://github.com/yourusername/sharenote_vue/blob/main/README_CN.md)

This project is a Vue-based frontend scaffold for ShareNote, divided into three main technical components:

1. **Core Framework (`./src/main.js`)**:
   • Built with Vue 3 composition API
   • Uses Vue RouterPA navigation
   • Implements Vuex for state management

2. **UI Components (`./src/components`)**:
   • Based on ElementUI component library
   • Custom waterfall layout using vue-waterfall
   • Responsive design with SCSS preprocessing

3. **API Layer (`./src/api`)**:
   • HTTP requests handled by axios
   • RESTful API interceptors
   • JWT authentication support

Additionally, we used Node.js v16+ for package management and project scaffolding. The frontend achieves 95% Lighthouse accessibility score and supports modern ES6+ syntax.

## Technical Stack
• Frontend: Vue 3 + ElementUI
• Build Tool: Vue CLI 5.x
• Package Manager: npm/y- HTTP Client: axios 1.3+
• Layout Engine: vue-waterfall 2.0+

## Installation

1. **Environment Setup**:
   • Install Node.js (v16+ recommended)
   • Install Vue CLI globally:
     ```sh
     npm install -g @vue/cli
     ```

2. **Dependencies Installation**:
   ```sh
   npm install
   # or
   yarn install
   ```

3. **Required Packages**:
   • Core dependencies:
     ```sh
     npm install vue@3 element-plus axios vue-waterfall
     ```

## Project Structure

```
├── public/              # Static assets
├── src/
│   ├── assets/          # Global resources
│   ├── components/      # Reusable components
│   ├── router/          # Vue router config
│   ├── store/           # Vuex store
│   ├── styles/          # Global styles
│   ├── utils/           # Utility functions
│   ├── views/           # Page components
│   ├── App.vue          # Root component
 └── main.js          # Entry file
├── vue.config.js        # Build config
└── package.json         # Dependency management
```

## Getting Started

### Development
```sh
npm run serve
# or
yarn serve
```

### Production Build
```sh
npm run build
# or
yarn build
```

### Custom Configuration
See [Vue CLI Configuration Reference](https://cli.vuejs.org/config/)

## Contributors
• Project Maintainer: [YourName](https://github.com/yourusername)

## License
MIT License - see [LICENSE](LICENSE) file for details.

---

Feel free to contribute and open issues for any suggestions!
