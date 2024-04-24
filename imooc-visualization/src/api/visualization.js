// 引入封装好的axios
import request from '../utils/request'


export const getVisualization = () => {
    return request({
        url: '/visualization'

    })
}