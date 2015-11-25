# file = File.open("OL_PopularBooks.json", "r")
file = File.open("OL_PopularBooks.json", "r")


  ## optionally add /^\"subjects\"/ for genre-tagging in the future
desired_regexes = {title: /^\"title\"/,
                   isbn: /^\"isbn_13\"/,
                   isbn2: /^\"isbn_10\"/,
                   description: /^\"description\"/,
                   author: /^\"by_statement\"/}
all_books = []

file.each_line do |line|

  books = line.split("publish_date")

  books.each do |book|
    book_data = {}
    props = book.split(/[\}, \", \]]\,/);
    props.each do |item|
      item = item.lstrip.chomp
      desired_regexes.each do |attr, regex|
        if regex.match(item)
          if attr == :isbn
            book_data[attr] = item[attr.length+9, 13].to_i
          elsif attr == :isbn2
            book_data[:isbn] ||= item[attr.length+8, 10].to_i
          elsif attr == :title
            book_data[attr] = item[attr.length+5, 200].chomp
          elsif attr == :author
            author = item[attr.length+11, 200].chomp
            if (author[author.length-1] == ".")
              author = author[0,author.length-1]
            end
            if (author[0,3] == "by ")
              author = author[3,author.length-3]
            end
            book_data[attr] = author
          else
            book_data[attr] = item[attr.length+5,2000].chomp
          end
        end
      end
    end
    if (!book_data.empty? &&
      !book_data[:title].nil? &&
      !book_data[:isbn].nil? &&
      !book_data[:author].nil? &&
      book_data[:isbn] > 0 &&
      book_data[:isbn] > 999999999)
      if (book_data[:description].nil? || book_data[:description].index("\/").nil?)
        all_books.push(book_data)
      end
    end
  end
end
# all_books.each do |book|
#   p book
#   p book[:title]
#   p book[:author]
#   p book[:description]
#   p book[:isbn]
# end

f = File.open("seedBooks.rb", "w")
  f.puts "def add_open_library_books"

  all_books.each do |book_data|
    f.puts %Q{Book.create!(title: \"#{book_data[:title]}\",
                           author: \"#{book_data[:author]}\",
                           isbn: #{book_data[:isbn]},
                           description: \"#{book_data[:description]}\")}
  end

  f.puts "end"
f.close
