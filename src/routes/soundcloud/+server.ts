import { redirect } from '@sveltejs/kit';

export const GET = () => {
	throw redirect(302, 'https://soundcloud.com/nomentionz');
};
