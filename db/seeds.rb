# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

require_relative 'seed_books.rb'

admin = User.create!(name: "admin",
             email: "admin@ready.com",
             password: "admin",
             librarian: true)
admin.make_default_shelves

guest = User.create!(name: "guest",
             email: "guest@ready.com",
             password: "guest",
             librarian: false)
guest.make_default_shelves

30.times do |i|
  user = User.create(name: Faker::Name.name,
               email: Faker::Internet.email,
               password: "password#{i+2}",
               librarian: false)
  user.make_default_shelves
end

Book.create!(title: "Ancillary Justice",
             author: "Ann Leckie",
             isbn: 9780356502403,
             description: "Winner of the Hugo, Nebula, British Science Fiction, Locus and Arthur C. Clarke Awards.
On a remote, icy planet, the soldier known as Breq is drawing closer to completing her quest.
Once, she was the Justice of Toren - a colossal starship with an artificial intelligence linking thousands of soldiers in the service of the Radch, the empire that conquered the galaxy.
Now, an act of treachery has ripped it all away, leaving her with one fragile human body, unanswered questions, and a burning desire for vengeance.")

Book.create!(title: "American Gods",
             author: "Neil Gaiman",
             isbn: 9780380789030,
             description: "Shadow is a man with a past. But now he wants nothing more than to live a quiet life with his wife and stay out of trouble. Until he learns that she's been killed in a terrible accident.
Flying home for the funeral, as a violent storm rocks the plane, a strange man in the seat next to him introduces himself. The man calls himself Mr. Wednesday, and he knows more about Shadow than is possible.
He warns Shadow that a far bigger storm is coming. And from that moment on, nothing will ever be the same...")

# Book.create!(title: "Annihilation",
#              author: "Jeff VanderMeer",
#              isbn: 9780374104092,
#              description: "Area X has been cut off from the rest of the continent for decades. Nature has reclaimed the last vestiges of human civilization. The first expedition returned with reports of a pristine, Edenic landscape; the second expedition ended in mass suicide, the third expedition in a hail of gunfire as its members turned on one another. The members of the eleventh expedition returned as shadows of their former selves, and within weeks, all had died of cancer. In Annihilation, the first volume of Jeff VanderMeer's Southern Reach trilogy, we join the twelfth expedition.
# The group is made up of four women: an anthropologist; a surveyor; a psychologist, the de facto leader; and our narrator, a biologist. Their mission is to map the terrain, record all observations of their surroundings and of one anotioner, and, above all, avoid being contaminated by Area X itself.
# They arrive expecting the unexpected, and Area X delivers―they discover a massive topographic anomaly and life forms that surpass understanding―but it's the surprises that came across the border with them and the secrets the expedition members are keeping from one another that change everything.")

Book.create!(title: "Monster, Vol. 1",
             author: "Naoki Urasawa",
             isbn: 9781591166412,
             description: "An ice-cold killer is on the loose, and brilliant Dr. Kenzo Tenma is the only one who can stop him! Conspiracies, serial murders, and a scathing indictment of hospital politics are all masterfully woven together in this compelling manga thriller. Tenma risks his promising medical career to save the life of a critically wounded young boy. Unbeknownst to him, this child is destined for a terrible fate. Who could have known that Tenma would create a monster!")

Shelving.create!(book_id: 1, shelf_id: 1)
Shelving.create!(book_id: 2, shelf_id: 1)
Shelving.create!(book_id: 3, shelf_id: 3)
Shelving.create!(book_id: 1, shelf_id: 4)
Shelving.create!(book_id: 2, shelf_id: 5)
Shelving.create!(book_id: 3, shelf_id: 6)

# 50.times do |i|
#   Book.create!(title: "Book #{i+4}",
#                author: "Alan Dean Foster",
#                isbn: 1234567890000 + i,
#                description: "Book #{i+4} by ADF")
#   10.times do
#     ## Use soft create to not worry about duplicates
#     Shelving.create(book_id: i+4, shelf_id: Random.rand(57) + 2)
#   end
# end

add_open_library_books

totalBooks = Book.all.count

Shelf.all.each do |shelf|
  # Generate a more reasonable number of currently-reading books
  if shelf.id % 3 == 2
    new_shelf = Shelving.create(book_id: Random.rand(totalBooks) + 1, shelf_id: shelf.id)
    new_shelf.created_at = Faker::Date.backward(10)
    new_shelf.save
  else
    30.times do
      new_shelf = Shelving.create(book_id: Random.rand(totalBooks) + 1, shelf_id: shelf.id)
      new_shelf.created_at = Faker::Date.backward(40)
      new_shelf.save
    end
  end
end

# Generate some more recent activity for the user feed

50.times do
  user_id = Random.rand(20) + 2;
  shelf_id = 3 * user_id - Random.rand(3);
  num_times = Random.rand(3);

  num_times.times do
    new_shelf = Shelving.create(book_id: Random.rand(totalBooks) + 1, shelf_id: shelf_id)
    new_shelf.created_at = Time.now() - Random.rand(17280);
    new_shelf.save
  end

end

# Book.create!(title: "The Well-Known and Beloved Book With An Excessively and Unnecessarily Lengthy Title",
#              author: "Dr. Sarah Samantha Dean-Whittingsmith the Fourteenth",
#              isbn: 9999999999999,
#              description: "Hilarious.")

Shelving.create(book_id: Book.last.id, shelf_id: 1)

20.times do |i|
  10.times do
    j = Random.rand(19) + 1
    Friendship.create(following_user_id: i+1, followed_user_id: j+1)
  end
end
