using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using ServiceStack.ServiceHost;

namespace BookService
{
    [Route("/Book")]
    public class BookInformation
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Author { get; set; }
        public Decimal Price { get; set; }
    }

    [Route("/Book/{Id}")]
    public class BookById
    {
        public int Id { get; set; }
    }

    [Route("/Book/Title/{Title}", "GET")]
    public class BookByTitle
    {
        public string Title { get; set; }
    }

    [Route("/Book", "GET")]
    public class AllBooks
    { }


}