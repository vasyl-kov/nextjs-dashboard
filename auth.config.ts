import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
	pages: {
		signIn: '/login'
	},
	callback: {
		authorized({ auth, request: { nextUrl}}) {
			const isLoggedIn = !!auth.user,
						isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
			if(isOnDashboard) {
				if(isLoggedIn) return true;
				return false;
			} else if(isLoggedIn) {
				return Response.redirect(new URL('/dashboard', nextUrl));
			}
			return true;
		},
	},
	providers: [],
} satisfies NextAuthConfig;