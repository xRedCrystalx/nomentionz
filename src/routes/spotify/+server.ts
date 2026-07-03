import { redirect } from '@sveltejs/kit';

export const GET = () => {
	throw redirect(302, 'hhttps://open.spotify.com/user/31la6pifyc4v4w6ys2q4awv5wgge');
};
