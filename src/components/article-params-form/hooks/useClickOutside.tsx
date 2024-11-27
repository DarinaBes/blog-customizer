import { useEffect, useCallback } from 'react';

type TUseClickOutside = {
	isOpen: boolean;
	onClose: () => void;
	rootRef: React.RefObject<HTMLElement>;
};

export function useClickOutside({
	isOpen,
	onClose,
	rootRef,
}: TUseClickOutside) {
	const handleClickOutside = useCallback(
		(event: MouseEvent) => {
			const { target } = event;

			if (
				target instanceof Node &&
				rootRef.current &&
				!rootRef.current.contains(target)
			) {
				onClose();
			}
		},
		[onClose, rootRef]
	);

	useEffect(() => {
		if (!isOpen) return;

		document.addEventListener('mousedown', handleClickOutside);

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isOpen, handleClickOutside]);
}
