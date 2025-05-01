import { useState, useRef } from 'react';
import clsx from 'clsx';

import { Select } from 'src/ui/select';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import {
	OptionType,
	fontFamilyOptions,
	fontSizeOptions,
	defaultArticleState,
	backgroundColors,
	fontColors,
	contentWidthArr,
	ArticleStateType,
} from 'src/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';
import { RadioGroup } from 'src/ui/radio-group';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';

type ArticleParamsFormProps = {
	articleParams: (options: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
	articleParams,
}: ArticleParamsFormProps) => {
	const [isOpen, setOpen] = useState(false);
	const [articleParamsState, setArticleParamsState] =
		useState(defaultArticleState);
	const toggleArrowButton = () => {
		setOpen(!isOpen);
	};
	const formStylle = clsx(styles.container, {
		[styles.container_open]: isOpen,
	});
	const ref = useRef<HTMLDivElement>(null);

	const handleOnChange = (field: keyof ArticleStateType) => {
		return (value: OptionType) => {
			setArticleParamsState((prevState) => ({ ...prevState, [field]: value }));
		};
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		articleParams(articleParamsState);
	};
	const handleReset = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		setArticleParamsState(defaultArticleState);

		articleParams(defaultArticleState);
	};

	useOutsideClickClose({
		isOpen: isOpen,
		onChange: setOpen,
		rootRef: ref,
	});
	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={toggleArrowButton} />
			<aside ref={ref} className={formStylle}>
				<form
					className={styles.form}
					onSubmit={handleSubmit}
					onReset={handleReset}>
					<Text size={31} weight={800} uppercase>
						Задайте параметры
					</Text>

					<Select
						selected={articleParamsState.fontFamilyOption}
						onChange={handleOnChange('fontFamilyOption')}
						options={fontFamilyOptions}
						title='Шрифт'
					/>

					<RadioGroup
						name='radio'
						onChange={handleOnChange('fontSizeOption')}
						selected={articleParamsState.fontSizeOption}
						options={fontSizeOptions}
						title='размер шрифта'
					/>

					<Select
						onChange={handleOnChange('fontColor')}
						selected={articleParamsState.fontColor}
						options={fontColors}
						title='цвет шрифта'
					/>

					<Separator />

					<Select
						selected={articleParamsState.backgroundColor}
						onChange={handleOnChange('backgroundColor')}
						options={backgroundColors}
						title='цвет фона'
					/>

					<Select
						selected={articleParamsState.contentWidth}
						onChange={handleOnChange('contentWidth')}
						options={contentWidthArr}
						title='ширина контента'
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
