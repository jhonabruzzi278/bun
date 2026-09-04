import { clerkMiddleware } from '@clerk/astro/server';

export const onRequest = clerkMiddleware((auth, context, next) => {
  const url = new URL(context.request.url);
  const isProtected = url.pathname.startsWith('/admin');
  const enforceAuth = process.env.CLERK_ENFORCE_AUTH === 'true';

  if (enforceAuth && isProtected && !auth().userId) {
    return auth().redirectToSignIn();
  }

  return next();
});
