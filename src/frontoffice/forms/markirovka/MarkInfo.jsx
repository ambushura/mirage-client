import {Box, Typography} from '@mui/material'
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked'

const MarkInfo = (props) => {
    const item = props.props.item
    const error_code = [
        'ошибки отсутствуют',
        'ошибка валидации КМ',
        'КМ не содержит GTIN',
        'КМ не содержит серийный номер',
        'КМ содержит недопустимые символы',
        'ошибка верификации крипто-подписи КМ (формат крипто-подписи не соответствует типу КМ)',
        'ошибка верификации крипто-подписи КМ (крипто-подпись не валидная)',
        'ошибка верификации крипто-подписи КМ (крипто-ключ не валиден)',
        'КМ не прошел верификацию в стране эмитента',
        'Найденные AI в КМ не поддерживаются',
        'КМ не найден в ГИС МТ',
        'КМ не найден в трансгране',
    ]

    if (item.mark !== null) {
        return (
            <Box
                component="form"
                noValidate
                autoComplete="off"
                onSubmit={(e) => {
                    e.preventDefault()
                }}
            >
                <Typography variant="h6" color="textSecondary" margin={1}>
                    Разрешительный режим
                </Typography>
                <Box className="mark-info">
                    <Box className="mark-info-row">
                        <Box>Марка</Box>
                        <Box sx={{fontWeight: 'bold'}}>{item.mark.value}</Box>
                    </Box>
                    <Box className="mark-info-row">
                        <Box>GTIN</Box>
                        <Box>{item.mark.gtin}</Box>
                    </Box>
                    <Box className="mark-info-row">
                        <Box>1. КМ успешно найдена в ЧЗ</Box>
                        <Box>
                            <RadioButtonCheckedIcon sx={{color: item.mark.found ? 'green' : 'red'}}/>
                        </Box>
                    </Box>
                    <Box className="mark-info-row">
                        <Box>2. КМ валидна</Box>
                        <Box>
                            <RadioButtonCheckedIcon sx={{color: item.mark.valid ? 'green' : 'red'}}/>
                        </Box>
                    </Box>
                    <Box className="mark-info-row">
                        <Box>3. КМ успешно проверена в ЧЗ</Box>
                        <Box>
                            <RadioButtonCheckedIcon sx={{color: item.mark.verified ? 'green' : 'red'}}/>
                        </Box>
                    </Box>
                    <Box className="mark-info-row">
                        <Box>4. КМ введена в оборот</Box>
                        <Box>
                            <RadioButtonCheckedIcon sx={{color: item.mark.realizable ? 'green' : 'red'}}/>
                        </Box>
                    </Box>
                    <Box className="mark-info-row">
                        <Box>5. КМ нанесена на упаковку</Box>
                        <Box>
                            <RadioButtonCheckedIcon sx={{color: item.mark.utilised ? 'green' : 'red'}}/>
                        </Box>
                    </Box>
                    <Box className="mark-info-row">
                        <Box>6. КМ заблокирована</Box>
                        <Box>
                            <RadioButtonCheckedIcon sx={{color: !item.mark.isblocked ? 'green' : 'red'}}/>
                        </Box>
                    </Box>
                    <Box className="mark-info-row">
                        <Box>7. КМ принадлежит вашему юр.лицу</Box>
                        <Box>
                            <RadioButtonCheckedIcon sx={{color: item.mark.isowner ? 'green' : 'red'}}/>
                        </Box>
                    </Box>
                    <Box className="mark-info-row">
                        <Box>8. КМ уже реализована</Box>
                        <Box>
                            <RadioButtonCheckedIcon sx={{color: !item.mark.sold ? 'green' : 'red'}}/>
                        </Box>
                    </Box>
                    <Box className="mark-info-row">
                        <Box>9. КМ прослеживается</Box>
                        <Box>{item.mark.istracking ? 'Да' : 'Нет'}</Box>
                    </Box>
                    <Box className="mark-info-row" sx={{fontWeight: 'bold'}}>
                        <Box>Номер запроса ЧЗ</Box>
                        <Box>{item.mark.reqId}</Box>
                    </Box>
                    <Box className="mark-info-row" sx={{fontWeight: 'bold'}}>
                        <Box>Время запроса (мс)</Box>
                        <Box>{item.mark.reqTimestamp}</Box>
                    </Box>
                    <Box className="mark-info-row" sx={{fontWeight: 'bold'}}>
                        <Box>Ошибки проверки</Box>
                        <Box sx={{textAlign: 'end'}}>
                            {item.mark.errorCode < error_code.length
                                ? error_code[item.mark.errorCode]
                                : 'Неклассифицируемая ошибка'}
                        </Box>
                    </Box>
                    <Box className="mark-info-row" sx={{fontWeight: 'bold'}}>
                        <Box>Сообщение ЧЗ</Box>
                        <Box sx={{textAlign: 'end'}}>{item.mark.message}</Box>
                    </Box>
                </Box>
            </Box>
        )
    }
}

export default MarkInfo
