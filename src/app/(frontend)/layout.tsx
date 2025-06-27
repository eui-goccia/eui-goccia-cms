import type React from 'react';

export const metadata = {
	description: 'EUI Goccia',
	title: 'EUI Goccia',
};

export default async function RootLayout(props: { children: React.ReactNode }) {
	const { children } = props;

	return (
		<html lang='it'>
			<body>
				<main>{children}</main>
			</body>
		</html>
	);
}
