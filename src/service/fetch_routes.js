export const ROUTE_MAIN_HOST = {ip: '10.101.3.88', port: 60000, payment_port: 60001, uid: ''}

// === ОБЩЕЕ ===
export const ROUTE_COMMON_LOGIN = "/api/common/login"
export const ROUTE_COMMON_EXCHANGE = "/api/exchange"
export const ROUTE_COMMON_CITIES_GET = "/api/common/cities/get"
export const ROUTE_COMMON_ORDER_ADD_CONTACT = "/api/common/order/add/contact"
export const ROUTE_COMMON_ORDERS_GET_RECEIPTS = "/api/common/orders/get_receipts"
export const ROUTE_COMMON_PAYMENT_METHODS_GET = "/api/common/payment_methods/get"
export const ROUTE_COMMON_ORDERS_FILTERS_STAFF_GET = "/api/common/orders/filters/staff/get"
export const ROUTE_COMMON_ORDERS_FILTERS_HALLS_GET = "/api/common/orders/filters/halls/get"
export const ROUTE_COMMON_ORDERS_FILTERS_WORKPLACES_GET = "/api/common/orders/filters/workplaces/get"
export const ROUTE_COMMON_PAYMENT_MAP_GET = "/api/common/payment_map/get"

// === ОПЛАТА ===
export const ROUTE_COMMON_ORDER_PAYMENT = "/api/common/order/payment"
export const ROUTE_COMMON_ORDER_PAYMENT_KIOSK = "/api/common/order/payment_kiosk"

// === ОБОРУДОВАНИЕ ===
export const ROUTE_EQUIPMENT_KKT_OPEN_BOX = "/api/equipment/kkt/open_box"
export const ROUTE_EQUIPMENT_KKT_X = "/api/equipment/kkt/x"
export const ROUTE_EQUIPMENT_KKT_Z = "/api/equipment/kkt/z"
export const ROUTE_EQUIPMENT_PINPAD_X = "/api/equipment/pinpad/x"
export const ROUTE_EQUIPMENT_PINPAD_Z = "/api/equipment/pinpad/z"
export const ROUTE_EQUIPMENT_WORKPLACE_RESET = "/api/equipment/workplace/reset"
export const ROUTE_EQUIPMENT_WORKPLACE_TURN_OFF = "/api/equipment/workplace/turn_off"
export const ROUTE_EQUIPMENT_WORKPLACE_TURN_ON = "/api/equipment/workplace/turn_on"
export const ROUTE_EQUIPMENT_KKT_REBOOT = "/api/equipment/kkt/reboot"

// === МАРКИРОВКА ===
export const ROUTE_MARKIROVKA_CDN_INFO_GET = "/api/markirovka/cdn/info/get"
export const ROUTE_MARKIROVKA_CDN_INFO_UPDATE = "/api/markirovka/cdn/info/update"

// === КИНО ===
// Скидки
export const ROUTE_CINEMA_DISCOUNTS_GET = "/api/cinema/discounts/get"
export const ROUTE_CINEMA_DISCOUNTS_GROUPS_GET = "/api/cinema/discounts/groups/get"
export const ROUTE_CINEMA_DISCOUNTS_APPLY = "/api/cinema/discounts/apply"

// Заказы
export const ROUTE_CINEMA_ORDERS_GET = "/api/cinema/orders/get"
export const ROUTE_CINEMA_ORDERS_GET_SCHEDULE = "/api/cinema/orders/get_schedule"
export const ROUTE_CINEMA_ORDER_GET = "/api/cinema/order/get"
export const ROUTE_CINEMA_ORDER_DELETE = "/api/cinema/order/delete"
export const ROUTE_CINEMA_ORDER_ADD_COMMENT = "/api/cinema/order/add/comment"
export const ROUTE_CINEMA_ORDER_DELETE_COMMENT = "/api/cinema/order/delete/comment"
export const ROUTE_CINEMA_ORDERS_FILTERS_STAFF_GET = "/api/cinema/orders/filters/schedule/get"

// Сеансы
export const ROUTE_CINEMA_SEANCE_ADD = "/api/cinema/seance/add"
export const ROUTE_CINEMA_SEANCE_CLOSE = "/api/cinema/seance/close"

export const ROUTE_CINEMA_SEANCE_GET = "/api/cinema/seance/get"
export const ROUTE_CINEMA_SEANCE_GET_BOOKING = "/api/cinema/seance/get_booking"

// Позиции заказа
export const ROUTE_CINEMA_PLACE_BLOCK = "/api/cinema/place/block"
export const ROUTE_CINEMA_POSITION_ADD = "/api/cinema/position/add"
export const ROUTE_CINEMA_POSITION_ADD_COMMENT = "/api/cinema/position/add/comment"
export const ROUTE_CINEMA_POSITION_DELETE_COMMENT = "/api/cinema/position/delete/comment"

// Киоск
export const ROUTE_CINEMA_KIOSK_POSITION_ADD = "/api/cinema/kiosk/position/add"

// Фильмы и расписание
export const ROUTE_CINEMA_FILMS_GET = "/api/cinema/films/get"
export const ROUTE_CINEMA_FILM_GET_SEANCES = "/api/cinema/film/get_seances"
export const ROUTE_CINEMA_SCHEDULE_GET_HALLS = "/api/cinema/schedule/get_halls"
export const ROUTE_CINEMA_HALL_GET = "/api/cinema/hall/get"
export const ROUTE_CINEMA_FILTERS_FILMS_GET = "/api/cinema/filters/films/get"

// === ХОРЕКА ===
// Заказы
export const ROUTE_HORECA_ORDER_GET = "/api/horeca/order/get"
export const ROUTE_HORECA_ORDERS_GET = "/api/horeca/orders/get"
export const ROUTE_HORECA_ORDER_ADD_PLACE = "/api/horeca/order/add_place"
export const ROUTE_HORECA_ORDER_DELETE = "/api/horeca/order/delete"
export const ROUTE_HORECA_ORDER_DELETE_PLACE = "/api/horeca/order/delete_place"
export const ROUTE_HORECA_ORDER_SEPARATE = "/api/horeca/order/separate"
export const ROUTE_HORECA_ORDER_CHECK = "/api/horeca/order/check"
export const ROUTE_HORECA_ORDER_ADD_COMMENT = "/api/horeca/order/add/comment"
export const ROUTE_HORECA_ORDER_DELETE_COMMENT = "/api/horeca/order/delete/comment"
export const ROUTE_HORECA_ORDERS_GET_STAFF = "/api/horeca/orders/get_staff"

// Прочие фильтры
export const ROUTE_HORECA_ORDERS_FILTERS_KITCHENPOINTS_GET = "/api/horeca/orders/filters/kitchen_points/get"

// Меню
export const ROUTE_HORECA_MENU_GET = "/api/horeca/menu/get"
export const ROUTE_HORECA_MODIFICATIONS_GET = "/api/horeca/modifications/get"

// Позиции заказа
export const ROUTE_HORECA_POSITION_ADD = "/api/horeca/position/add"
export const ROUTE_HORECA_POSITION_ADD_QUANTITY = "/api/horeca/position/add/quantity"
export const ROUTE_HORECA_POSITION_ADD_EGAIS = "/api/horeca/position/add/egais"
export const ROUTE_HORECA_POSITION_ADD_MARK = "/api/horeca/position/add/mark"
export const ROUTE_HORECA_POSITION_ADD_MODIFICATION = "/api/horeca/position/add_modification"
export const ROUTE_HORECA_POSITION_DELETE = "/api/horeca/position/delete"
export const ROUTE_HORECA_POSITION_ADD_COMMENT = "/api/horeca/position/add/comment"
export const ROUTE_HORECA_POSITION_DELETE_COMMENT = "/api/horeca/position/delete/comment"

// Кухня (состояния позиции)
export const ROUTE_HORECA_KITCHEN_GET = "/api/horeca/kitchen/get"
export const ROUTE_HORECA_KITCHEN_PUSH = "/api/horeca/kitchen/push"
export const ROUTE_HORECA_POSITION_AWAY = "/api/horeca/position/away"
export const ROUTE_HORECA_POSITION_COOK = "/api/horeca/position/cook"
export const ROUTE_HORECA_POSITION_COURSE = "/api/horeca/position/course"

// Получить объект
export const ROUTE_COMMON_CATALOG_GET = "/api/common/catalog/get"

export const ROUTE_PL_ESTIMATE_DISCOUNTS = "/api/pl/estimate_discounts"

// Документы
export const ROUTE_COMMON_DOCUMENTS_ZBOOKS_GET = "/api/common/documents/zbooks/get"