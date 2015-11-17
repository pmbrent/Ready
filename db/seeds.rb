# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

User.create!(name: "admin",
             email: "admin@ready.com",
             password: "admin",
             librarian: true)

20.times do |i|
  User.create!(name: "user#{i+2}",
               email: "user#{i+2}@place.com",
               password: "password#{i+2}",
               librarian: false)
end
