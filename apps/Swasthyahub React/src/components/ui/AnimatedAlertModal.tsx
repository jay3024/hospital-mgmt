import React from 'react';
import { CheckCircle2, AlertTriangle, XCircle } from 'lucide-react';
import HealthModal from './HealthModal';
import HealthButton from './HealthButton';

interface AnimatedAlertModalProps {
	isOpen: boolean;
	onClose: () => void;
	type?: 'success' | 'warning' | 'error';
	title?: string;
	description?: string;
	confirmText?: string;
	onConfirm?: () => void;
	cancelText?: string;
	onCancel?: () => void;
	closable?: boolean;
	className?: string;
}

const AnimatedAlertModal: React.FC<AnimatedAlertModalProps> = ({
	isOpen,
	onClose,
	type = 'success',
	title,
	description,
	confirmText = 'OK',
	onConfirm,
	cancelText,
	onCancel,
	closable = true,
	className = '',
}) => {
	const getIcon = () => {
		switch (type) {
			case 'success':
				return <CheckCircle2 className="w-6 h-6 sm:w-8 sm:h-8 md:w-9 md:h-9" />;
			case 'warning':
				return <AlertTriangle className="w-6 h-6 sm:w-8 sm:h-8 md:w-9 md:h-9" />;
			case 'error':
			default:
				return <XCircle className="w-6 h-6 sm:w-8 sm:h-8 md:w-9 md:h-9" />;
		}
	};

	const getColors = () => {
		switch (type) {
			case 'success':
				return {
					text: 'text-success',
					bgSoft: 'bg-success/15',
					border: 'border-success/30',
					ping: 'bg-success/25',
					btn: 'success' as const,
					variant: 'success' as const,
				};
			case 'warning':
				return {
					text: 'text-warning',
					bgSoft: 'bg-warning/15',
					border: 'border-warning/30',
					ping: 'bg-warning/25',
					btn: 'warning' as const,
					variant: 'warning' as const,
				};
			case 'error':
			default:
				return {
					text: 'text-destructive',
					bgSoft: 'bg-destructive/15',
					border: 'border-destructive/30',
					ping: 'bg-destructive/25',
					btn: 'danger' as const,
					variant: 'error' as const,
				};
		}
	};

	const colors = getColors();

	const handleConfirm = () => {
		if (onConfirm) onConfirm();
		onClose();
	};

	const footer = (
		<div className="w-full grid grid-cols-3 items-center gap-3">
			{/* Centered OK */}
			<div className="col-span-1" />
			<div className="col-span-1 flex justify-center">
				<HealthButton variant={colors.btn} onClick={handleConfirm}>
					{confirmText}
				</HealthButton>
			</div>
			{/* Right-aligned Cancel */}
			<div className="col-span-1 flex justify-end">
				{cancelText && (
					<HealthButton variant="outline" onClick={onCancel || onClose}>
						{cancelText}
                        
					</HealthButton>
				)}
			</div>
		</div>
	);

	return (
		<HealthModal
			isOpen={isOpen}
			onClose={onClose}
			title={undefined}
			closable={closable}
			size="sm"
			variant={colors.variant as any}
			className={className}
			footer={footer}
		>
			<div className="flex flex-col items-center text-center">
				<div className="relative mb-2 sm:mb-4">
					{/* Animated halo */}
					<span className={`absolute inset-0 rounded-full ${colors.ping} animate-ping`} />
					<span className={`absolute -inset-2 rounded-full ${colors.bgSoft} blur-xl opacity-50`} />
					<div
						className={`relative flex items-center justify-center w-10 h-10 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full ${colors.bgSoft} ${colors.border} border ${colors.text} shadow-inner`}
					>
						<div className="animate-in zoom-in-50 duration-300">
							{getIcon()}
						</div>
					</div>
				</div>

				{title && (
					<h3 className="text-xs sm:text-base md:text-lg font-semibold text-card-foreground mb-1">
						{title}
					</h3>
				)}
				{description && (
					<p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
						{description}
					</p>
				)}
			</div>
		</HealthModal>
	);
};

export default AnimatedAlertModal;
