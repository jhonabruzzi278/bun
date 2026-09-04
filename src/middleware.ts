import { clerkMiddleware } from '@clerk/astro/server';

// Check if Clerk keys are configured and clean any quotation marks
const rawPk = (process.env.PUBLIC_CLERK_PUBLISHABLE_KEY || process.env.CLERK_PUBLISHABLE_KEY || '')
  .trim()
  .replace(/^["']|["']$/g, '');
const rawSk = (process.env.CLERK_SECRET_KEY || '').trim().replace(/^["']|["']$/g, '');

const hasClerkKeys = Boolean(rawPk && rawSk);

// Initialize Clerk handler only if keys are present
let clerkHandler: any = null;
if (hasClerkKeys) {
  try {
    clerkHandler = clerkMiddleware((auth, context, next) => {
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
  } catch (initErr) {
    console.warn('Failed to initialize Clerk middleware handler:', initErr);
  }
}

export const onRequest = async (context: any, next: any) => {
  try {
    const url = new URL(context.request.url);
    const isProtected = url.pathname.startsWith('/admin');
    const enforceAuth = process.env.CLERK_ENFORCE_AUTH === 'true';

    // If Clerk is initialized, run through Clerk with safety wrapper
    if (clerkHandler) {
      try {
        return await clerkHandler(context, next);
      } catch (clerkErr) {
        console.error('Clerk runtime error caught (falling back):', clerkErr);
        if (enforceAuth && isProtected) {
          return context.redirect('/sign-in');
        }
        return next();
      }
    }

    // Fallback if Clerk is not configured yet
    if (enforceAuth && isProtected) {
      return context.redirect('/sign-in');
    }

    return next();
  } catch (globalErr) {
    console.error('Global middleware error caught:', globalErr);
    return next();
  }
};

