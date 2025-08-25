# Angular 20 + AngularJS 1.4.9 iframe Integration

This project demonstrates how to embed an AngularJS 1.4.9 application inside an Angular 20 application using iframe integration.

## 🎯 Project Overview

- **Host Application**: Angular 20 (Modern Angular)
- **Embedded Application**: AngularJS 1.4.9 (Legacy AngularJS)
- **Integration Method**: iframe with security sandboxing
- **Communication**: Isolated environments for complete separation

## 📁 Project Structure

```
├── angular-20/                    # Angular 20 host application
│   ├── src/app/components/
│   │   └── angularjs-iframe.component.ts  # iframe integration component
│   └── ...
├── angularjs-1.4.9/               # AngularJS 1.4.9 embedded application
│   ├── index.html                 # AngularJS app entry point
│   ├── app.js                     # AngularJS controller & logic
│   ├── styles.css                 # AngularJS app styling
│   └── ...
├── start-both-apps.ps1            # Windows PowerShell startup script
├── start-both-apps.sh             # Unix/Mac bash startup script
└── README-iframe-integration.md   # This file
```

## 🚀 Quick Start

### Option 1: Automated Startup (Recommended)

**For Windows (PowerShell):**
```powershell
.\start-both-apps.ps1
```

**For Unix/Mac (Bash):**
```bash
./start-both-apps.sh
```

### Option 2: Manual Startup

1. **Start AngularJS Application:**
   ```bash
   cd angularjs-1.4.9
   npm install
   npm run serve
   ```
   The AngularJS app will be available at http://localhost:3000

2. **Start Angular Application (in a new terminal):**
   ```bash
   cd angular-20
   npm install
   npm start
   ```
   The Angular app will be available at http://localhost:4200

## 🔧 Technical Implementation

### iframe Integration Component

The `AngularjsIframeComponent` handles:
- **Safe URL sanitization** using Angular's `DomSanitizer`
- **Server status checking** to detect if AngularJS app is running
- **Error handling** with user-friendly instructions
- **Responsive design** for different screen sizes

### Key Features

1. **Security**: iframe uses sandbox attributes for security isolation
2. **Error Handling**: Displays helpful instructions when AngularJS server isn't running
3. **Real-time Status**: Checks server availability and updates UI accordingly
4. **Responsive**: Works on mobile and desktop devices

### iframe Configuration

```html
<iframe 
  [src]="iframeUrl"
  title="AngularJS 1.4.9 Application"
  width="100%"
  height="600"
  frameborder="0"
  scrolling="yes"
  sandbox="allow-scripts allow-same-origin allow-forms">
</iframe>
```

## 🛡️ Security Considerations

- **Sandbox Attributes**: Restricts iframe capabilities for security
- **URL Sanitization**: Uses Angular's built-in security features
- **Same-Origin Policy**: Both apps run on localhost for development
- **Content Security Policy**: Consider CSP headers for production

## 🌐 Production Deployment

For production deployment:

1. **Host AngularJS App**: Deploy the AngularJS app to a web server
2. **Update iframe URL**: Change the URL in `AngularjsIframeComponent`
3. **Configure CORS**: Ensure proper CORS headers if cross-origin
4. **SSL/TLS**: Use HTTPS for both applications in production

Example production configuration:
```typescript
const url = 'https://your-angularjs-app.com';
this.iframeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
```

## 🔄 Communication Between Apps

This implementation uses **iframe isolation** approach:

- ✅ **Complete Isolation**: No conflicts between Angular versions
- ✅ **Independent Deployment**: Each app can be deployed separately
- ✅ **Security**: Sandboxed environment
- ❌ **Limited Communication**: No direct data sharing (by design)

### Alternative Integration Methods

If you need tighter integration, consider:
- **Angular Elements** (convert AngularJS to custom elements)
- **Module Federation** (webpack-based micro-frontends)
- **PostMessage API** (for iframe communication)

## 🚧 Troubleshooting

### AngularJS App Not Loading

1. **Check Server Status**: Ensure AngularJS server is running on port 3000
2. **Port Conflicts**: Make sure port 3000 is not used by other applications
3. **Browser Console**: Check for CORS or loading errors
4. **Network Tab**: Verify iframe is making requests to correct URL

### Common Issues

**Error**: "This page can't be loaded in an iframe"
- **Solution**: Some servers block iframe embedding; check X-Frame-Options headers

**Error**: "Mixed Content" warnings
- **Solution**: Ensure both apps use same protocol (HTTP/HTTPS)

**Error**: "Connection Refused"
- **Solution**: AngularJS server not running; start with `npm run serve`

## 📊 Performance Considerations

- **Initial Load**: Both applications load independently
- **Memory Usage**: Each app maintains its own runtime
- **Network**: Separate resource loading for each application
- **Caching**: Configure appropriate cache headers for production

## 🧪 Development Tips

1. **Hot Reload**: Both apps support hot reloading during development
2. **Debugging**: Use browser dev tools for each application separately
3. **Testing**: Test iframe integration across different browsers
4. **Mobile**: Verify responsive behavior on mobile devices

## 📝 Customization

### Styling the iframe Container

Modify styles in `AngularjsIframeComponent` to customize:
- Container dimensions
- Loading states
- Error messages
- Responsive breakpoints

### Adding Communication

To enable communication between apps:
```typescript
// In Angular app
window.addEventListener('message', (event) => {
  if (event.origin === 'http://localhost:3000') {
    // Handle message from AngularJS app
  }
});

// In AngularJS app
parent.postMessage({ type: 'data', payload: data }, '*');
```

## 🤝 Contributing

When contributing to this integration:
1. Test both applications independently
2. Verify iframe integration works
3. Update documentation for any new features
4. Consider security implications of changes

## 📚 Resources

- [Angular Security Guide](https://angular.dev/best-practices/security)
- [iframe Security Best Practices](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe#security_concerns)
- [AngularJS Documentation](https://docs.angularjs.org/)
- [PostMessage API](https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage)

---

**Note**: This integration approach is ideal for legacy application migration scenarios where you need to gradually transition from AngularJS to modern Angular while maintaining both systems simultaneously.