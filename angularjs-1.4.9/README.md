# AngularJS 1.4.9 Application

A simple AngularJS 1.4.9 application demonstrating basic features including data binding, controllers, and a simple todo list.

## Features

- **Data Binding**: Two-way data binding with input fields
- **Controller**: Basic controller setup with scope variables and functions
- **Todo List**: Add, complete, and remove todos
- **Responsive Design**: Mobile-friendly CSS styling

## Project Structure

```
angularjs-1.4.9/
├── index.html      # Main HTML file with AngularJS app
├── app.js          # AngularJS application and controller
├── styles.css      # CSS styling
├── package.json    # Project metadata and scripts
└── README.md       # This file
```

## Getting Started

### Option 1: Open directly in browser
1. Simply open `index.html` in your web browser
2. The application will load and work immediately

### Option 2: Use a local server (recommended)
1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run serve
   ```

3. The application will open automatically in your browser at `http://localhost:3000`

## AngularJS 1.4.9 Features Demonstrated

- **Module Definition**: Creating an AngularJS module
- **Controller**: Using controllers to manage scope
- **Data Binding**: Two-way data binding with `ng-model`
- **Directives**: Using built-in directives like `ng-repeat`, `ng-if`, `ng-click`
- **Event Handling**: Handling click events and keypress events
- **Array Manipulation**: Adding and removing items from arrays

## Browser Compatibility

This application is compatible with:
- Internet Explorer 9+
- Chrome
- Firefox
- Safari
- Edge

## Notes

- This project uses AngularJS 1.4.9, which is the legacy version of Angular
- AngularJS 1.x is different from Angular 2+ (which is now just called "Angular")
- No build process is required - the application runs directly in the browser
- AngularJS is loaded from Google's CDN for simplicity

## Learning Resources

- [AngularJS Official Documentation](https://docs.angularjs.org/api)
- [AngularJS Tutorial](https://docs.angularjs.org/tutorial)
- [AngularJS Style Guide](https://github.com/johnpapa/angular-styleguide/blob/master/a1/README.md)