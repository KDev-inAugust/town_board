# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)


User.all.destroy_all
Post.all.destroy_all
PostTopic.all.destroy_all
Topic.all.destroy_all

u1=User.create(user_name: "Tim", password: "password1")
u2=User.create(user_name: "Ennakaia", password: "password2")
u3=User.create(user_name: "Molandy", password: "password3")

p1=Post.create(title: "Tim's initial [Tim]", user_id: 1, body: "body of post one")
p2=Post.create(title: "Ennakaia's initial [Ennakaia]", user_id: 2, body: "body of post two")
p3=Post.create(title: "Molandy's initial [Molandy]", user_id: 3, body: "body of post three")
p4=Post.create(title: "Tim's follow up [Tim]", user_id: 1, body: "body of post three")
p5=Post.create(title: "Ennakaia's follow up [Ennakaia]", user_id: 2, body: "body of post three")
p6=Post.create(title: "Molandy's Follow Up [Molandy]", user_id: 3, body: "body of post three")


t4=Topic.create(name: "Other")

pt1=PostTopic.create(topic_id: 1, post_id: 1)
pt2=PostTopic.create(topic_id: 2, post_id: 1)
pt3=PostTopic.create(topic_id: 3, post_id: 1)
pt4=PostTopic.create(topic_id: 1, post_id: 2)
pt5=PostTopic.create(topic_id: 2, post_id: 2)
pt6=PostTopic.create(topic_id: 3, post_id: 2)
pt7=PostTopic.create(topic_id: 1, post_id: 3)

puts "done seeding"