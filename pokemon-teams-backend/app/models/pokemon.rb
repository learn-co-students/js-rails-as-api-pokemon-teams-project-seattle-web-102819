class Pokemon < ApplicationRecord
  belongs_to :trainer

  def self.createFakePokemon(id)
    name = Faker::Name.first_name
    species = Faker::Games::Pokemon.name
    Pokemon.create(nickname: name, species: species, trainer_id: id)
  end
end
