json.user do
  json.name @user.name
  json.email @user.email
  json.id @user.id
  json.shelves @user.shelves
end
