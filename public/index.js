'use strict';
var socket = io('ws://localhost:8080');
var campaigns;

function renderCampaigns() {
  $('#campaignDiv').empty();
  campaigns.forEach(campaign => {
    var start = new Date(campaign.startTime);
    var end = new Date(campaign.endTime);

    var table = $('#CampaignTemplate').html();
    table = table.replace(/{{id}}/g, campaign._id);
    table = table.replace(/{{name}}/g, campaign.name);
    table = table.replace(/{{start}}/g, start.toDateString() + ' ' + start.toLocaleTimeString('en-GB'));
    table = table.replace(/{{end}}/g, end.toDateString() + ' ' + end.toLocaleTimeString('en-GB'));
    var table_ele = $(table);
    campaign.options.forEach(option => {
      var row = $('#CampaignOptionTemplate').html();
      row = row.replace(/{{id}}/g, option._id);
      row = row.replace(/{{option}}/g, option.name);
      row = row.replace(/{{votes}}/g, option.votes.length);
      table_ele.find('tbody').append(row);
    });
    $('#campaignDiv').append(table_ele);
  });
}

$(function() {
  socket.on('new_vote', data => {
    console.log(data);
    $('#' + data.campaign_id).find('#' + data.vote_id).find('.votes').html(data.votes);
  });
  socket.on('new_campaign', data => {
    campaigns.push(data.campaign);
    renderCampaigns();
  });

  $.get({
    url: '/api/v1/campaigns',
    success: function(data) {
      console.log(data);
      if(data.success) {
        campaigns = data.campaigns;
        renderCampaigns();
      }
    }
  });
});
