using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Todo_API.Models;

namespace Todo_API.Controllers
{
    [Route("api/[controller]")]
    public class TodoController : Controller
    {
        private readonly TodoContext _context;

        public TodoController(TodoContext context)
        {
            _context = context;
        }

        [HttpGet(Name = "test")]
        public IEnumerable<TodoItem> GetAll()
        {
            return _context.TodoItems.ToList();
        }

        [HttpGet("{id}", Name = "GetTodo")]
        public IActionResult GetById(long id)
        {
            var item = _context.TodoItems.FirstOrDefault(t => t.Id == id);

            return new ObjectResult(item);
        }

        [HttpPost]
        public IActionResult Create([FromBody] TodoItem item)
        {
            if (item == null)
            {
                return BadRequest();
            }

            _context.TodoItems.Add(item);
            _context.SaveChanges();

            return CreatedAtRoute("GetTodo", new { id = item.Id }, item);
        }

        [HttpPost("{id}")]
        public IActionResult Delete(long id)
        {
            var item = _context.TodoItems.Find(id);
            _context.TodoItems.Remove(item);
            _context.SaveChanges();
            return CreatedAtRoute("test", null, null);
        }

        [HttpPost("edit/{id}")]
        public IActionResult Edit(long id,[FromBody] TodoItem item)
        {
            var selectitem = _context.TodoItems.Find(id);
            selectitem.Name = item.Name;

            _context.SaveChanges();

            return new ObjectResult(selectitem);
        }
    }
}
