import { clerkMiddleware } from '@clerk/astro/server';

export const onRequest = clerkMiddleware((auth, context, next) => {
  try {
    const url = new URL(context.request.url);
    const isProtected = url.pathname.startsWith('/admin');
    const enforceAuth = process.env.CLERK_ENFORCE_AUTH === 'true';

    if (enforceAuth && isProtected) {
      const authData = auth();
      if (!authData || !authData.userId) {
        return authData?.redirectToSignIn ? authData.redirectToSignIn() : context.redirect('/sign-in');
      }
    }
  } catch (e) {
    console.warn('Middleware auth guard warning:', e);
  }

  return next();
});

