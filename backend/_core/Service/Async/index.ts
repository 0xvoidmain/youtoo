export async function Async(callback): Promise<any> {
    if (callback) {
        return new Promise((resolve, reject) => {
            callback && callback((error, result) => {
                if (error) return reject(error)
                resolve(result)
            })
        })
    }
}