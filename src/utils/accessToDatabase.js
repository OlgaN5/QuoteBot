class AccessToDatabase {
  async getRandom(Model) {
    console.log(Model)
    return await Model.aggregate([{
      $sample: {
        size: 1
      }
    }])
  }
  async getRandomByConditions(Model, conditions) {
    console.log(Model)
    return await Model.aggregate([{
        $match: conditions
      },
      {
        $sample: {
          size: 1
        }
      }
    ])
  }
  async getAllByConditions(Model, conditions) {
    return await Model.find(conditions)
  }


  async create(Model, data) {

    return await Model.create(data)
  }



  async updateOne(Model, conditions, data) {
    return await Model.updateOne(conditions,
      data)
  }
  async deleteOne(Model, conditions) {
    return await Model.deleteOne(conditions)

  }
}

module.exports = new AccessToDatabase()