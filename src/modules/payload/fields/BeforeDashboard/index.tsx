import { Banner } from '@payloadcms/ui/elements/Banner';
import type React from 'react';

import { SeedButton } from './SeedButton';
import './index.scss';

const baseClass = 'before-dashboard';

const BeforeDashboard: React.FC = () => {
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
