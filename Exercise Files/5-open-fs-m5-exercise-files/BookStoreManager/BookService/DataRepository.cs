using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using ServiceStack.OrmLite;

namespace BookService
{
    public class DataRepository
    {

        public IDbConnectionFactory DbConnectionFactory { get; set; }
        public int AddBook(Book request)
        {
            using (var db = DbConnectionFactory.OpenDbConnection())
            {
                db.CreateTable<Book>();
                if (request.Id == 0)
                {
                    db.Insert(request); 
                }
                else
                {
                    db.Update(request);
                }
                return (int) db.GetLastInsertId();
            }
        }


        public void DeleteBook(Book request)
        {

            using (var db = DbConnectionFactory.OpenDbConnection())
            {
                db.Delete(request);
            }

        }

        public void DeleteBook(int id)
        {
           DeleteBook(new Book{Id = id});            
        }


        public Book GetBookById(int id)
        {
            using (var db = DbConnectionFactory.Open())
            {
                return db.Select<Book>(e => e.Id == id).FirstOrDefault();
            }

        }

        public Book GetBookByTitle(string title)
        {
            using (var db = DbConnectionFactory.Open())
            {
                return  db.Select<Book>(e => e.Title == title).FirstOrDefault();
            }
        }

        public List<Book>GetAllBooks()
        {
            using (var db = DbConnectionFactory.Open())
            {
                return db.Select<Book>();
            }      
        }

    }
}