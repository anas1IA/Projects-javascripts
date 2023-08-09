from flask import Flask,redirect,url_for,render_template,request,jsonify
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///todo.db'  # SQLite database
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True

db = SQLAlchemy(app)


class Task(db.Model):
	id= db.Column(db.Integer, primary_key=True,autoincrement=True)
	content = db.Column(db.String(200), nullable=True)
	done = db.Column(db.Boolean, default=False)

	def __repr__(self):
		return f'<Task content = "{self.content}">'

@app.route("/")
def index():
	return render_template("newone.html")


@app.route('/get_tasks', methods=['GET'])
def get_tasks():
    tasks = Task.query.all()  # Retrieve all tasks from the database

    def getDictTask(task):
        return {
            "id": task.id,
            "content": task.content,
            "done": task.done
        }

    data = {
        "tasks": list(map(getDictTask, tasks))
    }

    return jsonify(data)



@app.route('/add_task', methods=['POST'])
def add_task():
    data = request.json  # Read JSON data from the request body
    content = data.get('content')
    done = data.get('done', False)

    if content:
        new_task = Task(content=content, done=done)
        db.session.add(new_task)
        db.session.commit()
        return jsonify({'message': 'Task added successfully'}), 201
    else:
        return jsonify({'error': 'Content field is required'}), 400

@app.route('/delete_task/<int:task_id>', methods=['DELETE'])

def delete_task(task_id):
   task = Task.query.get(task_id)  # Retrieve the task by its ID
   if task:
      db.session.delete(task)  # Delete the task
      db.session.commit()
      return jsonify({'message': 'Task deleted successfully'}), 200
   else:
      return jsonify({'error': 'Task not found'}), 404

@app.route('/update_task/<int:task_id>', methods=['PUT'])

def update_task(task_id):
    task = Task.query.get(task_id)  # Retrieve the task by its ID
    if task:
        data = request.json  # Read JSON data from the request body
        content = data.get('content', task.content)
        done = data.get('done', task.done)

        task.content = content
        task.done = done

        db.session.commit()
        return jsonify({'message': 'Task updated successfully'}), 200
    else:
        return jsonify({'error': 'Task not found'}), 404

if __name__ == '__main__':
    app.run(debug=True)




	
