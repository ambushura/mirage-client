import { Box, Button } from '@mui/material'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'

export const MobileOrderCard = ({ order, onEdit, onDetails }) => {
    return (
        <Box
            onClick={onDetails}
            sx={{
                p: 2,
                mb: 2,
                borderRadius: '12px',
                background: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                '&:active': {
                    background: 'rgba(255, 255, 255, 0.1)',
                    borderColor: 'rgba(255, 255, 255, 0.2)',
                    transform: 'scale(0.98)',
                },
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
            }}
        >
            {/* Левая часть - информация */}
            <Box sx={{ flex: 1, minWidth: 0 }}>
                <Box
                    sx={{
                        fontSize: '16px',
                        fontWeight: 600,
                        color: '#fff',
                        mb: 1,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                    }}
                >
                    Заказ #{order.id}
                </Box>

                <Box
                    sx={{
                        fontSize: '13px',
                        color: 'rgba(255, 255, 255, 0.6)',
                        mb: 1,
                        display: 'flex',
                        justifyContent: 'space-between',
                    }}
                >
                    <span>{order.table}</span>
                    <span>{order.time}</span>
                </Box>

                <Box
                    sx={{
                        fontSize: '12px',
                        color: 'rgba(255, 255, 255, 0.5)',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                    }}
                >
                    {order.items} блюд • {order.sum} ₽
                </Box>
            </Box>

            {/* Правая часть - иконка и статус */}
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-end',
                    gap: 1,
                    ml: 2,
                    flexShrink: 0,
                }}
            >
                <Box
                    sx={{
                        px: 1.5,
                        py: 0.5,
                        borderRadius: '6px',
                        background: getStatusColor(order.status).bg,
                        color: getStatusColor(order.status).text,
                        fontSize: '11px',
                        fontWeight: 600,
                        textTransform: 'uppercase',
                    }}
                >
                    {order.status}
                </Box>
                <ChevronRightIcon sx={{ fontSize: '20px', color: 'rgba(255,255,255,0.5)' }} />
            </Box>
        </Box>
    )
}

/**
 * MobileHallCard - Карточка зала
 *
 * Компактная карточка для отображения зала с кнопками действий
 */
export const MobileHallCard = ({ hall, onEdit, onDelete }) => {
    return (
        <Box
            sx={{
                p: 2.5,
                borderRadius: '12px',
                background: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                transition: 'all 0.2s',
                '&:hover': {
                    background: 'rgba(255, 255, 255, 0.1)',
                    borderColor: 'rgba(255, 255, 255, 0.2)',
                },
            }}
        >
            {/* Заголовок и статус */}
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mb: 1.5,
                }}
            >
                <Box sx={{ fontSize: '16px', fontWeight: 600, color: '#fff' }}>{hall.name}</Box>
                <Box
                    sx={{
                        px: 1.5,
                        py: 0.5,
                        borderRadius: '8px',
                        background: hall.available ? 'rgba(76, 175, 80, 0.2)' : 'rgba(244, 67, 54, 0.2)',
                        color: hall.available ? '#4CAF50' : '#f44336',
                        fontSize: '11px',
                        fontWeight: 600,
                    }}
                >
                    {hall.available ? 'Свободен' : 'Занят'}
                </Box>
            </Box>

            {/* Информация */}
            <Box
                sx={{
                    fontSize: '13px',
                    color: 'rgba(255, 255, 255, 0.6)',
                    mb: 2,
                    pb: 1.5,
                    borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                }}
            >
                <Box sx={{ mb: 0.5 }}>Мест: {hall.capacity}</Box>
                <Box>Доступно: {hall.available_seats}</Box>
            </Box>

            {/* Кнопки */}
            <Box sx={{ display: 'flex', gap: 1 }}>
                <Button
                    size="small"
                    onClick={onEdit}
                    sx={{
                        flex: 1,
                        py: 1,
                        borderRadius: '8px',
                        background: 'rgba(255, 255, 255, 0.08)',
                        color: '#fff',
                        fontSize: '12px',
                        fontWeight: 600,
                        textTransform: 'none',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        '&:hover': {
                            background: 'rgba(255, 255, 255, 0.12)',
                        },
                    }}
                >
                    <EditIcon sx={{ fontSize: '14px', mr: 0.5 }} />
                    Редактировать
                </Button>
                <Button
                    size="small"
                    onClick={onDelete}
                    sx={{
                        p: 1,
                        borderRadius: '8px',
                        background: 'rgba(244, 67, 54, 0.1)',
                        color: '#f44336',
                        minWidth: 'auto',
                        border: '1px solid rgba(244, 67, 54, 0.2)',
                        '&:hover': {
                            background: 'rgba(244, 67, 54, 0.2)',
                        },
                    }}
                >
                    <DeleteIcon sx={{ fontSize: '16px' }} />
                </Button>
            </Box>
        </Box>
    )
}

/**
 * MobileStatCard - Карточка со статистикой
 *
 * Компактная карточка для отображения KPI
 */
export const MobileStatCard = ({ title, value, subtitle, icon, color = 'primary' }) => {
    const colorMap = {
        primary: '#FF3B47',
        success: '#4CAF50',
        warning: '#FF9800',
        info: '#2196F3',
    }

    return (
        <Box
            sx={{
                p: 2,
                borderRadius: '12px',
                background: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                display: 'flex',
                gap: 2,
                alignItems: 'center',
            }}
        >
            {/* Иконка */}
            <Box
                sx={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '10px',
                    background: `${colorMap[color]}20`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    color: colorMap[color],
                }}
            >
                {icon}
            </Box>

            {/* Информация */}
            <Box sx={{ flex: 1 }}>
                <Box
                    sx={{
                        fontSize: '12px',
                        color: 'rgba(255, 255, 255, 0.6)',
                        mb: 0.5,
                    }}
                >
                    {title}
                </Box>
                <Box
                    sx={{
                        fontSize: '18px',
                        fontWeight: 700,
                        color: '#fff',
                        mb: 0.5,
                    }}
                >
                    {value}
                </Box>
                {subtitle && (
                    <Box
                        sx={{
                            fontSize: '11px',
                            color: 'rgba(255, 255, 255, 0.5)',
                        }}
                    >
                        {subtitle}
                    </Box>
                )}
            </Box>
        </Box>
    )
}

/**
 * MobileListItem - Универсальный элемент списка
 *
 * Адаптивный элемент со множеством конфигураций
 */
export const MobileListItem = ({ title, subtitle, rightText, icon, onClick, clickable = true, badge }) => {
    return (
        <Box
            onClick={onClick}
            sx={{
                p: 2,
                mb: 1,
                borderRadius: '10px',
                background: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                cursor: clickable ? 'pointer' : 'default',
                transition: 'all 0.2s',
                '&:active': clickable
                    ? {
                          background: 'rgba(255, 255, 255, 0.1)',
                          transform: 'scale(0.98)',
                      }
                    : {},
            }}
        >
            {/* Иконка */}
            {icon && (
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'rgba(255, 255, 255, 0.7)',
                        flexShrink: 0,
                    }}
                >
                    {icon}
                </Box>
            )}

            {/* Текст */}
            <Box sx={{ flex: 1, minWidth: 0 }}>
                <Box
                    sx={{
                        fontSize: '14px',
                        fontWeight: 600,
                        color: '#fff',
                        mb: 0.5,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                    }}
                >
                    {title}
                </Box>
                {subtitle && (
                    <Box
                        sx={{
                            fontSize: '12px',
                            color: 'rgba(255, 255, 255, 0.5)',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                        }}
                    >
                        {subtitle}
                    </Box>
                )}
            </Box>

            {/* Правая часть */}
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    flexShrink: 0,
                }}
            >
                {badge && (
                    <Box
                        sx={{
                            px: 1,
                            py: 0.5,
                            borderRadius: '6px',
                            background: 'rgba(255, 59, 71, 0.2)',
                            color: '#FF3B47',
                            fontSize: '11px',
                            fontWeight: 600,
                        }}
                    >
                        {badge}
                    </Box>
                )}
                {rightText && (
                    <Box
                        sx={{
                            fontSize: '13px',
                            color: 'rgba(255, 255, 255, 0.6)',
                            fontWeight: 600,
                        }}
                    >
                        {rightText}
                    </Box>
                )}
                {clickable && (
                    <ChevronRightIcon
                        sx={{
                            fontSize: '20px',
                            color: 'rgba(255, 255, 255, 0.4)',
                        }}
                    />
                )}
            </Box>
        </Box>
    )
}

/**
 * MobileEmptyState - Пустое состояние
 *
 * Красивое отображение когда нет данных
 */
export const MobileEmptyState = ({ icon, title, subtitle, action }) => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                py: 8,
                px: 3,
                textAlign: 'center',
            }}
        >
            {icon && (
                <Box
                    sx={{
                        fontSize: '48px',
                        mb: 2,
                        opacity: 0.5,
                    }}
                >
                    {icon}
                </Box>
            )}
            <Box
                sx={{
                    fontSize: '16px',
                    fontWeight: 600,
                    color: '#fff',
                    mb: 1,
                }}
            >
                {title}
            </Box>
            {subtitle && (
                <Box
                    sx={{
                        fontSize: '13px',
                        color: 'rgba(255, 255, 255, 0.6)',
                        mb: 3,
                    }}
                >
                    {subtitle}
                </Box>
            )}
            {action && (
                <Button
                    variant="contained"
                    onClick={action.onClick}
                    sx={{
                        background: 'linear-gradient(135deg, #ff3b47 0%, #7a0005 100%)',
                        textTransform: 'none',
                        borderRadius: '10px',
                        px: 3,
                    }}
                >
                    {action.label}
                </Button>
            )}
        </Box>
    )
}

/**
 * MobileGrid - Адаптивная сетка для карточек
 *
 * Автоматически подстраивается под размер экрана
 */
export const MobileGrid = ({ children, gap = 2, columns = 'auto' }) => {
    return (
        <Box
            sx={{
                display: 'grid',
                gridTemplateColumns: columns === 'auto' ? 'repeat(auto-fill, minmax(150px, 1fr))' : `repeat(${columns}, 1fr)`,
                gap,
            }}
        >
            {children}
        </Box>
    )
}

function getStatusColor(status) {
    const colors = {
        new: { bg: 'rgba(33, 150, 243, 0.2)', text: '#2196F3' },
        pending: { bg: 'rgba(255, 152, 0, 0.2)', text: '#FF9800' },
        ready: { bg: 'rgba(76, 175, 80, 0.2)', text: '#4CAF50' },
        completed: { bg: 'rgba(156, 39, 176, 0.2)', text: '#9C27B0' },
        cancelled: { bg: 'rgba(244, 67, 54, 0.2)', text: '#f44336' },
    }
    return colors[status] || colors['new']
}

export default {
    MobileOrderCard,
    MobileHallCard,
    MobileStatCard,
    MobileListItem,
    MobileEmptyState,
    MobileGrid,
}
