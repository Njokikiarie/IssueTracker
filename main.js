document.getElementById('issueInputForm').addEventListener('submit', saveIssue)
document.getElementById('searchForm').addEventListener('submit', search)

function saveIssue(e) {
    var issueDesc = document.getElementById('issueDescInput').value;
    var issueSeverity = document.getElementById('issueSeverityInput').value;
    var issueAssignedTo = document.getElementById('issueAssignInput').value;
    var issueId = chance.guid();
    var issueStatus = 'Open';

    var issue = {
        id: issueId,
        description: issueDesc,
        severity: issueSeverity,
        assignedTo: issueAssignedTo,
        status: issueStatus
    }

    if (localStorage.getItem('issues') == null){
        var issues = [];
        issues.push(issue);
        localStorage.setItem('issues', JSON.stringify(issues));
    } else {
        var issues = JSON.parse(localStorage.getItem('issues'));
        issues.push(issue);
        localStorage.setItem('issues', JSON.stringify(issues));
    }

    document.getElementById('issueInputForm').reset();

    fetchIssues();

    e.preventDefault();
}

function setStatusClosed(id) {
    var issues = JSON.parse(localStorage.getItem('issues'));

    for (var i=0; i < issues.length; i++){
        if (issues[i].id == id){
            issues[i].status = 'Closed';
        }
    }
    localStorage.setItem('issues', JSON.stringify(issues));
    fetchIssues();
}

function deleteIssue(id){
    var issues = JSON.parse(localStorage.getItem('issues'));

    for (var i=0; i < issues.length; i++){
        if (issues[i].id == id){
            issues.splice(i, 1);
        }
    }
    localStorage.setItem('issues', JSON.stringify(issues));
    fetchIssues();
}
function fetchIssues(){
    var issues = JSON.parse(localStorage.getItem('issues'));
    var issuesList = document.getElementById('issuesList');

    issuesList.innerHTML = '';

    for (var i=0; i < issues.length; i++){
        var id = issues[i].id;
        var desc = issues[i].description;
        var severity = issues[i].severity;
        var assignedTo = issues[i].assignedTo;
        var status = issues[i].status;

        issuesList.innerHTML += '<div class="card">' +
                                '<div class="card-header"><h6> Issue ID: ' + id + '</h6></div>' +
                                '<div class="card-body"><p><span class="btn btn-info"> ' + status + '</span></p>' +
                                '<h3 class="card-title"> Description:&nbsp' + desc + '</h3>' +
                                '<p class="card-text"> Severity:&nbsp<span class="glyphicon glyphicon-time"></span>' + severity + '</p>' +
                                '<p class="card-text"> Assigned To:&nbsp<span class="glyphicon glyphicon-user"></span>' + assignedTo + '</p>' +
                                '<a href="#" onclick="setStatusClosed(\''+id+'\')" class="btn btn-warning"> Close</a> &nbsp' +
                                '<a href="#" onclick="deleteIssue(\''+id+'\')" class="btn btn-danger"> Delete </a>' +
                                '</div></div>';     

    }
}

function search(){
    $(document).ready(function(){
    $("#searchForm").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        $("#myDIV *").filter(function() {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });
    });
}