import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { RadioGroup } from 'src/ui/radio-group';
import { Select } from 'src/ui/select';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';
import { useClickOutside } from './hooks/useClickOutside';
import { useRef, useState, useCallback, FormEvent } from 'react';
import {
	ArticleStateType,
	OptionType,
	backgroundColors,
	contentWidthArr,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	defaultArticleState,
} from 'src/constants/articleProps';
import clsx from 'clsx';
import styles from './ArticleParamsForm.module.scss';

export type ArticleParamsFormProps = {
	currentArticleState: ArticleStateType;
	setCurrentArticleState: (articleState: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
	currentArticleState,
	setCurrentArticleState,
}: ArticleParamsFormProps) => {
	const [open, setOpen] = useState(false);
	const ref = useRef<HTMLElement | null>(null);

	useClickOutside({
		isOpen: open,
		onClose: () => setOpen(false),
		rootRef: ref,
	});
	const toggleSidebar = useCallback(() => {
		setOpen((prevOpen) => !prevOpen);
	}, []);
	const [formsState, setFormsState] =
		useState<ArticleStateType>(currentArticleState);

	const onChange = (fieldName: string) => {
		return (value: OptionType) => {
			setFormsState((prevState) => ({
				...prevState,
				[fieldName]: value,
			}));
		};
	};

	const onSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setCurrentArticleState(formsState);
	};

	const onReset = () => {
		setFormsState(defaultArticleState);
		setCurrentArticleState(defaultArticleState);
	};
	return (
		<>
			<ArrowButton isOpen={open} onClick={toggleSidebar} />
			<aside
				ref={ref}
				className={clsx(styles.container, open && styles.container_open)}>
				<form className={styles.form} onSubmit={onSubmit} onReset={onReset}>
					<Text uppercase={true} weight={800} size={31} align='center'>
						Задайте параметры
					</Text>
					<Select
						title='Шрифт'
						selected={formsState.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={onChange('fontFamilyOption')}
					/>
					<RadioGroup
						title='Размер шрифта'
						name='fontSize'
						selected={formsState.fontSizeOption}
						options={fontSizeOptions}
						onChange={onChange('fontSizeOption')}
					/>
					<Select
						title='Цвет шрифта'
						selected={formsState.fontColor}
						options={fontColors}
						onChange={onChange('fontColor')}
					/>
					<Separator />
					<Select
						title='Цвет фона'
						selected={formsState.backgroundColor}
						options={backgroundColors}
						onChange={onChange('backgroundColor')}
					/>
					<Select
						title='Ширина контента'
						selected={formsState.contentWidth}
						options={contentWidthArr}
						onChange={onChange('contentWidth')}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
