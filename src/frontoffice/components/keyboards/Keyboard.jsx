import { useState } from 'react'
import SimpleKeyboard from 'react-simple-keyboard'
import { Box } from '@mui/material'

const Keyboard = (props) => {
    const [layout, setLayout] = useState('default')
    const [language, setLanguage] = useState('ru')
    const handleLanguageSwitch = () => {
        setLanguage((prevLang) => (prevLang === 'en' ? 'ru' : 'en'))
    }
    const layouts = {
        en: {
            default: [
                '` 1 2 3 4 5 6 7 8 9 0 - = {bksp}',
                'q w e r t y u i o p',
                'a s d f g h j k l {enter}',
                '{shift} z x c v b n m',
                '.com @ {lang} {space} {lang}',
            ],
            shift: [
                '~ ! @ # $ % ^ & * ( ) _ + {bksp}',
                'Q W E R T Y U I O P',
                'A S D F G H J K L {enter}',
                '{shift} Z X C V B N M',
                '.com @ {lang} {space} {lang}',
            ],
        },
        ru: {
            default: [
                'ё " 1 2 3 4 5 6 7 8 9 0 - = {bksp}',
                'й ц у к е н г ш щ з',
                'ф ы в а п р о л д ж э {enter}',
                '{shift} я ч с м и т ь б ю',
                '.com @ {lang} {space} {lang}',
            ],
            shift: [
                'Ё " ! № ; % : ? * ( ) _ + {bksp}',
                'Й Ц У К Е Н Г Ш Щ З',
                'Ф Ы В А П Р О Л Д Ж Э {enter}',
                '{shift} Я Ч С М И Т Ь Б Ю',
                '.com @ {lang} {space} {lang}',
            ],
        },
        num: {
            default: ['7 8 9', '4 5 6', '1 2 3', '0 00 000', '{bksp} {enter}'],
            shift: ['7 8 9', '4 5 6', '1 2 3', '0 00 000', '{bksp} {enter}'],
        },
        auth: {
            default: ['7 8 9', '4 5 6', '1 2 3', '0 {enter}'],
            shift: ['7 8 9', '4 5 6', '1 2 3', '0 {enter}'],
        },
    }
    return (
        <Box>
            <SimpleKeyboard
                onChange={props.setInput}
                buttonTheme={[
                    { class: 'mirageEnterKey', buttons: 'all' },
                    {
                        class: 'mirageLangButton',
                        buttons: '{lang}',
                    },
                    { class: 'mirageEnter', buttons: '{enter}' },
                ]}
                layout={props.type === 'auth' ? layouts['auth'] : layouts[language]}
                layoutName={layout}
                theme={`hg-theme-default ${props.type === 'auth' ? 'mirageNumTheme' : 'mirageTheme'}`}
                onKeyPress={(button) => {
                    if (button === '{lang}') handleLanguageSwitch()
                    if (button === '{shift}') setLayout(layout === 'default' ? 'shift' : 'default')
                    if (button === '{enter}') props.apply()
                }}
                display={{
                    '{bksp}': 'Удалить',
                    '{enter}': 'OK',
                    '{shift}': 'Shift',
                    '{space}': 'Пробел',
                    '{lang}': language === 'ru' ? 'EN' : 'RU',
                }}
            />
        </Box>
    )
}

export default Keyboard
