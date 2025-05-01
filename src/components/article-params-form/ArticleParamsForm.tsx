import { useState, useRef } from 'react';
import clsx from 'clsx';

import { Select } from 'src/ui/select';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import {
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
	const [open, setOpen] = useState(false);
	const [fontFamily, setFontFamily] = useState(
		defaultArticleState.fontFamilyOption
	);
	const [fontSize, setFontSize] = useState(defaultArticleState.fontSizeOption);
	const [fontColor, setFontColor] = useState(defaultArticleState.fontColor);
	const [background, setBackground] = useState(
		defaultArticleState.backgroundColor
	);
	const [WidthArr, setWidthArr] = useState(defaultArticleState.contentWidth);
	const toggleArrowButton = () => {
		setOpen(!open);
	};
	const formStylle = clsx(styles.container, { [styles.container_open]: open });
	const ref = useRef<HTMLDivElement>(null);

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		articleParams({
			fontFamilyOption: fontFamily,
			fontSizeOption: fontSize,
			fontColor: fontColor,
			backgroundColor: background,
			contentWidth: WidthArr,
		});
	};
	const handleReset = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		setFontSize(defaultArticleState.fontSizeOption);
		setFontFamily(defaultArticleState.fontFamilyOption);
		setBackground(defaultArticleState.backgroundColor);
		setWidthArr(defaultArticleState.contentWidth);
		setFontColor(defaultArticleState.fontColor);

		articleParams(defaultArticleState);
	};

	useOutsideClickClose({
		isOpen: open,
		onChange: setOpen,
		rootRef: ref,
	});
	return (
		<>
			<ArrowButton isOpen={open} onClick={toggleArrowButton} />
			<aside ref={ref} className={formStylle}>
				<form
					className={styles.form}
					onSubmit={handleSubmit}
					onReset={handleReset}>
					<Text size={31} weight={800} uppercase>
						Задайте параметры
					</Text>

					<Select
						selected={fontFamily}
						onChange={setFontFamily}
						options={fontFamilyOptions}
						title='Шрифт'
					/>

					<RadioGroup
						name='radio'
						onChange={setFontSize}
						selected={fontSize}
						options={fontSizeOptions}
						title='размер шрифта'
					/>

					<Select
						onChange={setFontColor}
						selected={fontColor}
						options={fontColors}
						title='цвет шрифта'
					/>

					<Separator />

					<Select
						selected={background}
						onChange={setBackground}
						options={backgroundColors}
						title='цвет фона'
					/>

					<Select
						selected={WidthArr}
						onChange={setWidthArr}
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
