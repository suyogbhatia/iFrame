import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-angularjs-iframe',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './angularjs-iframe.component.html',
  styleUrls: ['./angularjs-iframe.component.scss']
})
export class AngularjsIframeComponent implements OnInit {
  iframeUrl: SafeResourceUrl;
  isAngularJSServerRunning = false;
  serverCheckMessage = 'Checking server status...';
  newTodoText = '';
  sentTodos: string[] = [];

  constructor(
    private sanitizer: DomSanitizer, 
    private cdr: ChangeDetectorRef
  ) {
    // For development, this will point to a local server
    // In production, you'd point to wherever the AngularJS app is hosted
    const url = 'http://localhost:3000'; // We'll serve the AngularJS app on port 3000
    this.iframeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  ngOnInit() {
    // Check if the AngularJS server is running
    this.checkAngularJSServer();
    
    // Listen for messages from the iframe
    window.addEventListener('message', (event) => {
      console.log('📨 Received message from origin:', event.origin, 'Data:', event.data);
      
      if (event.origin === 'http://localhost:3000') {
        console.log('✅ Processing message from AngularJS iframe:', event.data);
        
        if (event.data.type === 'TODO_RECEIVED') {
          console.log('🎉 Todo successfully received by AngularJS app:', event.data.payload.todoText);
        } else if (event.data.type === 'ANGULARJS_READY') {
          console.log('🚀 AngularJS app is ready for communication!');
        }
      } else {
        console.log('⚠️ Message from different origin, ignoring:', event.origin);
      }
    });
  }

  async checkAngularJSServer() {
    console.log('Checking AngularJS server at http://localhost:3000...');
    this.serverCheckMessage = 'Checking server status...';
    
    try {
      const response = await fetch('http://localhost:3000', {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
        }
      });
      
      console.log('Server response:', response.status, response.statusText);
      this.isAngularJSServerRunning = response.ok;
      
      if (response.ok) {
        this.serverCheckMessage = '✅ AngularJS server is running!';
        console.log('✅ AngularJS server detected and running');
      } else {
        this.serverCheckMessage = `❌ Server responded with status: ${response.status}`;
        console.log('❌ Server responded but with error status:', response.status);
      }
    } catch (error) {
      console.error('❌ Failed to connect to AngularJS server:', error);
      this.isAngularJSServerRunning = false;
      this.serverCheckMessage = `❌ Connection failed: ${error}`;
    }
  }

  onKeyUp(event: KeyboardEvent) {
    const inputValue = (event.target as HTMLInputElement).value;
    console.log('Key up:', event.key, 'Input value:', inputValue, 'Model value:', this.newTodoText);
    
    // Force update if ngModel isn't working
    if (this.newTodoText !== inputValue) {
      this.newTodoText = inputValue;
      this.cdr.markForCheck();
    }
  }

  onKeyDown(event: KeyboardEvent) {
    console.log('Key down:', event.key);
    if (event.key === 'Enter') {
      event.preventDefault();
      this.sendTodoToIframe();
    }
  }

  onInputFocus() {
    console.log('Input focused');
  }

  onInputBlur() {
    console.log('Input blurred, current value:', this.newTodoText);
  }

  sendTodoToIframe() {
    console.log('🚀 Attempting to send todo:', this.newTodoText);
    if (!this.newTodoText.trim()) {
      alert('Please enter a todo task!');
      return;
    }

    const iframe = document.querySelector('iframe') as HTMLIFrameElement;
    console.log('🔍 Iframe element:', iframe);
    console.log('🔍 Iframe contentWindow:', iframe?.contentWindow);
    console.log('🔍 Iframe src:', iframe?.src);

    if (iframe && iframe.contentWindow) {
      const todoData = {
        type: 'ADD_TODO',
        payload: {
          text: this.newTodoText.trim(),
          completed: false,
          timestamp: new Date().toISOString()
        }
      };

      console.log('📤 Sending message to iframe:', todoData);
      console.log('📤 Target origin: http://localhost:3000');

      try {
        // Send message to iframe
        iframe.contentWindow.postMessage(todoData, 'http://localhost:3000');
        
        // Add to sent todos list for display
        this.sentTodos.push(this.newTodoText.trim());
        
        console.log('✅ Message sent successfully');
        this.newTodoText = '';
      } catch (error) {
        console.error('❌ Error sending message:', error);
        alert('Error sending message to iframe: ' + error);
      }
    } else {
      console.error('❌ Iframe not available');
      alert('Iframe not ready or AngularJS server not running!');
    }
  }

  clearSentTodos() {
    this.sentTodos = [];
  }


}