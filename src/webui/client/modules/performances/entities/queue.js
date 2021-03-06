require('backbone.naturalsort')

module.exports = Backbone.Collection.extend({
    model: require('./queue_item'),
    sortType: 'natural',
    comparator: function(model) {
        return (model.get('performance').get('name') || '').toLowerCase()
    },
    findItemByTime: function(time) {
        let offset = 0
        return this.find(function(item) {
            offset += item.get('performance').getDuration()
            return time < offset
        })
    }
})