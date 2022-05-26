import React, { Component } from 'react';
import Login from './Login';

export class ErrorBoundary extends Component {

    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI.
        return { hasError: true };
    }

    render() {
        const LOCAL_STORAGE_KEY = 'token';
        if (this.state.hasError) {
            // You can render any custom fallback UI
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(null));
            return <Login />;
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
