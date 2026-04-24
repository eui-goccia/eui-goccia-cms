/** biome-ignore-all lint/style/noNestedTernary: faster to write */
'use client';

import { Collapsible, toast } from '@payloadcms/ui';
import type React from 'react';
import { useState } from 'react';

import './index.scss';

const SuccessMessage: React.FC<{ action: string }> = ({ action }) => (
	<div>
		{action} completed! You can now{' '}
		<a href='/' rel='noopener' target='_blank'>
			visit your website
		</a>
	</div>
);

type SeedPhase =
	| 'cleanup'
	| 'posts'
	| 'timeline'
	| 'about'
	| 'progetto'
	| 'home'
	| 'all';

interface PhaseState {
	loading: boolean;
	completed: boolean;
	error: string | null;
}

const SEED_PHASES: Array<{
	key: SeedPhase;
	label: string;
	endpoint: string;
	icon: string;
	description: string;
	variant: 'danger' | 'primary' | 'secondary';
}> = [
	{
		key: 'cleanup',
		label: 'Cleanup Database',
		endpoint: '/next/seed-cleanup',
		icon: '🧹',
		description: 'Remove all existing data',
		variant: 'danger',
	},
	{
		key: 'home',
		label: 'Seed Home',
		endpoint: '/next/seed-home',
		icon: '🏠',
		description: 'Create home page data',
		variant: 'secondary',
	},
	{
		key: 'timeline',
		label: 'Seed Timeline',
		endpoint: '/next/seed-timeline',
		icon: '🕐',
		description: 'Create La Goccia timeline data',
		variant: 'secondary',
	},
	{
		key: 'about',
		label: 'Seed About',
		endpoint: '/next/seed-about',
		icon: 'ℹ️',
		description: 'Create about page data',
		variant: 'secondary',
	},
	{
		key: 'progetto',
		label: 'Seed Progetto',
		endpoint: '/next/seed-progetto',
		icon: '🏗️',
		description: 'Create project data',
		variant: 'secondary',
	},
	{
		key: 'posts',
		label: 'Seed Posts',
		endpoint: '/next/seed-posts',
		icon: '📝',
		description: 'Create blog posts and authors',
		variant: 'secondary',
	},
	{
		key: 'all',
		label: 'Seed All',
		endpoint: '/next/seed',
		icon: '🌱',
		description: 'Complete database seeding (cleanup + all data)',
		variant: 'primary',
	},
];

export const SeedButton: React.FC = () => {
	const [phaseStates, setPhaseStates] = useState<Record<SeedPhase, PhaseState>>(
		() =>
			SEED_PHASES.reduce(
				(acc, phase) => ({
					// biome-ignore lint/performance/noAccumulatingSpread: need to spread anyway
					...acc,
					[phase.key]: { loading: false, completed: false, error: null },
				}),
				{} as Record<SeedPhase, PhaseState>
			)
	);

	const updatePhaseState = (phase: SeedPhase, updates: Partial<PhaseState>) => {
		setPhaseStates((prev) => ({
			...prev,
			[phase]: { ...prev[phase], ...updates },
		}));
	};

	const handleClick = async (
		phase: SeedPhase,
		endpoint: string,
		label: string
	) => {
		const currentState = phaseStates[phase];

		if (currentState.completed) {
			toast.info(`${label} already completed.`);
			return;
		}
		if (currentState.loading) {
			toast.info(`${label} already in progress.`);
			return;
		}
		if (currentState.error) {
			toast.error('An error occurred, please refresh and try again.');
			return;
		}

		updatePhaseState(phase, { loading: true, error: null });

		try {
			toast.promise(
				new Promise((resolve, reject) => {
					fetch(endpoint, { method: 'POST', credentials: 'include' })
						.then((res) => {
							if (res.ok) {
								resolve(true);
								updatePhaseState(phase, { completed: true, loading: false });
							} else {
								reject(`An error occurred while ${label.toLowerCase()}.`);
							}
						})
						.catch((error) => {
							reject(error);
						});
				}),
				{
					loading: `${label} in progress...`,
					success: <SuccessMessage action={label} />,
					error: `An error occurred while ${label.toLowerCase()}.`,
				}
			);
		} catch (err) {
			const error = err instanceof Error ? err.message : String(err);
			updatePhaseState(phase, { error, loading: false });
		}
	};

	return (
		<Collapsible header='Seed Options' initCollapsed={true}>
			<div className='seedButtonContainer'>
				<h3 className='seedTitle'>BE CAREFUL</h3>
				<p className='seedDescription'>
					Choose individual phases or seed all data at once.{' '}
					<strong>⚠️ Cleanup will remove all existing data!</strong>
				</p>

				<div className='seedPhases'>
					{SEED_PHASES.map((phase) => {
						const state = phaseStates[phase.key];
						const statusClass = state.loading
							? 'loading'
							: state.completed
								? 'completed'
								: state.error
									? 'error'
									: '';

						return (
							<div className={`seedPhase ${statusClass}`} key={phase.key}>
								<button
									className={`seedButton seedButton--${phase.variant} ${statusClass}`}
									disabled={state.loading}
									onClick={() =>
										handleClick(phase.key, phase.endpoint, phase.label)
									}
									type='button'
								>
									<span className='seedButton__icon'>{phase.icon}</span>
									<span className='seedButton__label'>{phase.label}</span>
									{state.loading ? (
										<span className='seedButton__spinner'>⏳</span>
									) : null}
									{state.completed ? (
										<span className='seedButton__checkmark'>✅</span>
									) : null}
									{state.error ? (
										<span className='seedButton__error'>❌</span>
									) : null}
								</button>
								<p className='seedPhaseDescription'>{phase.description}</p>
								{state.error ? (
									<p className='seedPhaseError'>Error: {state.error}</p>
								) : null}
							</div>
						);
					})}
				</div>
			</div>
		</Collapsible>
	);
};
