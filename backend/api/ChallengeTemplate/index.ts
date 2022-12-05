import { HTTPRequest } from "../../HTTPFunction";

export default async (req: HTTPRequest) => {
    return [{
        templateId: 1,
        name: 'Đầu tư crypto mỗi ngày',
        description: 'Người dùng sẽ mua số lượng token nhất định theo khung thời gian nhất định',
        params: [{
                key: 'tokenName',
                name: 'Token',
                description: 'Loại token mà người dùng cần mua',
                type: 'string'
            }, {
                key: 'amount',
                name: 'Số lương',
                description: 'Số lượng token cần mua để vượt qua thử thách',
                type: 'number'
            }, {
                key: 'timeframe',
                name: 'Chu kỳ thực hiện',
                description: 'Thời gian thực hiện thử thách',
                type: ['daily', 'weekly']
            }, {
                key: 'startAt',
                name: 'Thời gian bắt đầu',
                type: 'date'
            }, {
                key: 'numberTimeframe',
                name: 'Số chu kỳ',
                type: 'date'
            }, {
                key: 'depositAmount',
                name: 'Số tiền cam kết',
                description: 'Số tiền mà người tham gia cần nạp để tham gia. Nếu không hoàn thành thử thách số tiền sẽ chuyển vào quỹ thưởng.',
                type: 'number'
            }
        ]
    }, {
        templateId: 2,
        name: 'Hít đất',
        description: 'Người tham gia sẽ phải hít đất mỗi ngày để vượt qua thử thách',
        params: [{
                key: 'amount',
                name: 'Số lương',
                description: 'Số lần pushup một lần thực hiện',
                type: 'number'
            }, {
                key: 'timeframe',
                name: 'Chu kỳ thực hiện',
                description: 'Thời gian thực hiện thử thách',
                type: ['daily']
            }, {
                key: 'startAt',
                name: 'Thời gian bắt đầu',
                type: 'date'
            }, {
                key: 'numberTimeframe',
                name: 'Số chu kỳ',
                type: 'date'
            }, {
                key: 'depositAmount',
                name: 'Số tiền cam kết',
                description: 'Số tiền mà người tham gia cần nạp để tham gia. Nếu không hoàn thành thử thách số tiền sẽ chuyển vào quỹ thưởng.',
                type: 'number'
            }
        ]
    }, {
        templateId: 3,
        name: 'Chạy bộ',
        description: 'Người tham gia sẽ phải chạy đủ số km mỗi tuần',
        params: [{
                key: 'amount',
                name: 'Số km',
                description: 'Số km cần chạy mỗi tuần',
                type: 'number'
            }, {
                key: 'timeframe',
                name: 'Chu kỳ thực hiện',
                description: 'Thời gian thực hiện thử thách',
                type: ['weekly']
            }, {
                key: 'startAt',
                name: 'Thời gian bắt đầu',
                type: 'date'
            }, {
                key: 'numberTimeframe',
                name: 'Số chu kỳ',
                type: 'date'
            }, {
                key: 'depositAmount',
                name: 'Số tiền cam kết',
                description: 'Số tiền mà người tham gia cần nạp để tham gia. Nếu không hoàn thành thử thách số tiền sẽ chuyển vào quỹ thưởng.',
                type: 'number'
            }
        ]
    }]
}