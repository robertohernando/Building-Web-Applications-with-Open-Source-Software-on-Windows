using System;
using ServiceStack.DataAnnotations;

namespace BookService
{
    public class Book
    {
        [AutoIncrement]
        public int Id { get; set; }

        public string Title { get; set; }
        public string Author { get; set; }
        public Decimal Price { get; set; }
    }
}