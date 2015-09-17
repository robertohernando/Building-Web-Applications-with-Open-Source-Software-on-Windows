using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using ServiceStack.ServiceInterface;

namespace BookService
{
    public class BookService : Service
    {
        public DataRepository Repo { get; set; }
        public object Post(BookInformation submission)
        {
            var book = new Book()
            {
                Id = submission.Id,
                Title = submission.Title,
                Author = submission.Author,
                Price = submission.Price
            };
            int id = Repo.AddBook(book);
            return new {Id = id};
        }

        public List<Book> Get(AllBooks request)
        {
            return Repo.GetAllBooks();
        }

        public object Get(BookByTitle request)
        {
            return Repo.GetBookByTitle(request.Title);
        }
        public object Get(BookById book)
        {
            return Repo.GetBookById(book.Id);
        }
        public void Delete(BookById book)
        {
            Repo.DeleteBook(book.Id);
        }

    }
}