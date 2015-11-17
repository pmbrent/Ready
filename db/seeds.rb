# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

admin = User.new(name: "admin",
             email: "admin@ready.com",
             password: "admin",
             librarian: true)

admin.ensure_session_token
admin.save!

20.times do |i|
  new_user = User.new(name: "user#{i+2}",
               email: "user#{i+2}@place.com",
               password: "password#{i+2}",
               librarian: false)
  new_user.ensure_session_token
  new_user.save
end
