# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)


u1=User.create(user_name: "Tim", password: "password1")
u2=User.create(user_name: "Ennakaia", password: "password2")
u3=User.create(user_name: "Molandy", password: "password3")

p1=Post.create(title: "post one", user_id: 1, body: "body of post one")
p1=Post.create(title: "post two", user_id: 2, body: "body of post two")
p1=Post.create(title: "post three", user_id: 3, body: "body of post three")

puts "done seeding"