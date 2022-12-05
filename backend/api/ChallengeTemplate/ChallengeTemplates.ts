function tf(v) {
    return `${v == 'daily' ? 'mỗi ngày' : 'hàng tuần'}`
}

function clear(params, defaultData = {}) {
    params = {
        ...defaultData,
        ...params
    }
    Object.keys(params).forEach(k => {
        if (!params[k]) {
            delete params[k]
        }
    })
    return params
}

const ChallengeTemplates = [{
    templateId: 1,
    name: 'Mua crypto mỗi ngày',
    description: 'Người dùng sẽ mua số lượng token nhất định theo khung thời gian nhất định',
    params: [{
            key: 'token',
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
    ],
    create(params) {
        params = clear(params, {
            token: 'SOL',
            amount: 1,
            timeframe: 'daily',
            startAt: Date.now(),
            numberTimeframe: 7,
            depositAmount: 10,
        })
        return {
            name: `Mua ${params.amount} ${params.token} ${tf(params.timeframe)}`,
            description: `Mua ${params.amount} ${params.token} ${tf(params.timeframe)} để trở thành tỷ phú sau 2 năm nữa các bạn ơi. \nViệc mua hàng ngày sẽ giúp bạn trung bình giá tốt trong dài hạn. Đây là một chiến lược đầu tư đơn giản nhưng hiệu quả.`,
            ...params,
        }
    }
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
    ],
    create(params) {
        params = clear(params, {
            amount: 20,
            timeframe: 'daily',
            startAt: Date.now(),
            numberTimeframe: 7,
            depositAmount: 10,
        })
        return {
            name: `Chống đẩy ${params.amount} lần liên tục ${tf(params.timeframe)}`,
            description: `Chống đẩy mỗi ngày sẽ giúp ngực bạn đẹp hơn. Đơn giản hiệu quả, không tốn tiền`,
            ...params,
        }
    }
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
    ],
    create(params) {
        params = clear(params, {
            amount: 20,
            timeframe: 'weekly',
            startAt: Date.now(),
            numberTimeframe: 7,
            depositAmount: 10,
        })
        return {
            name: `Chạy ${params.amount} km ${tf(params.timeframe)}`,
            description: `Chạy bộ giúp bạn giảm cân và hệ tim mạch tốt hơn. Tham gia cùng chúng mình nhé.`,
            ...params,
        }
    }
}]

export default ChallengeTemplates