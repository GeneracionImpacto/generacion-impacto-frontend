import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';

export const httpInterceptorFn: HttpInterceptorFn = (req, next) => {
  // Don't add token to auth endpoints
  if (req.url.includes('/api/auth/')) {
    return next(req);
  }
  
  const authService = inject(AuthService);
  const token = authService.getToken();
  
  if (token) {
    console.log('Adding Authorization header with token:', token.substring(0, 20) + '...');
    const clonedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next(clonedReq);
  } else {
    console.warn('No token found for request to:', req.url);
    return next(req);
  }
};




