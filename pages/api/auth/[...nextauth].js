import NextAuth from "next-auth";
import spotifyApi, { LOGIN_URL } from "../../../lib/spotify";
import SpotifyProvider from "next-auth/providers/spotify";

/* Logic refreshedToken */
async function refreshAccessToken(token) {
    try {

        spotifyApi.setAccessToken(token.accessToken);
        spotifyApi.setRefreshToken(token.refreshToken);

        const { body: refreshedToken } = await spotifyApi.refreshAccessToken();
        console.log("Refreshed Token is", refreshedToken);

        return {
            ...token,
            accessToken: refreshedToken.access_token,
            accessTokenExpires: Date.now + refreshedToken.expires_in * 1000, // = 1 hour  as 3600 retruns in seconds Api
            refreshToken: refreshedToken.refresh_token ?? token.refreshToken,
            // Replace if  new one came back elese fall back to old refresh token
        };

    } catch(err) {
        console.error(err);

        return {
            ...token,
            err: 'RefreshAccessTokenError',
        };
    }
}

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    SpotifyProvider({
      clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
      authorization: LOGIN_URL,
    }),
    // ...add more providers here
  ],
    secret: process.env.JWT_SECRET,
    pages: {
        signIn: '/login'
    },
    callbacks: {
        async jwt({ token, account, user }){
            
            // initial sigin in
            if (account && user) {
                return {
                    ...token,
                    accessToken: account.access_token,
                    refreshToken: account.refresh_token,
                    username: account.providerAccountId,
                    accessTokenExpires: account.expires_at * 1000, /* This for expireing time in Miliseconds hence * 1000 */  
                };
            }

            /* Retun previous token if the access token has not expired yet */
            if (Date.now() < token.accessTokenExpires) {
                console.log("exiting access token is valid");
                return token;
            } 
            /* Access token has expired, so we need to refresh it ..*/
            conslog.log("exiting access token is valid");
            return await refreshAccessToken(token);
        },

        async session({ session, token }) {
            session.user.accessToken = token.accessToken;
            session.user.refreshToken = token.refreshToken;
            session.user.username = token.username;

            return session;
        }
    },
});