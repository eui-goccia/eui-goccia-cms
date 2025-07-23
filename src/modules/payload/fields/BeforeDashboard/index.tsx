import type { User } from '@payload-types';
import { Banner } from '@payloadcms/ui/elements/Banner';

import { SeedButton } from './SeedButton';
import './index.scss';

const baseClass = 'before-dashboard';

const BeforeDashboard = ({ user }: { user: User }) => {
	if (user.role !== 'admin') {
		return null;
	}

	return (
		<div className={baseClass}>
			<Banner className={`${baseClass}__banner`} type='success'>
				<h4>Welcome to your dashboard!</h4>
			</Banner>
			<SeedButton />
		</div>
	);
};

export default BeforeDashboard;
